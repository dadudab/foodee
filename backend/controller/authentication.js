const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cart = require('../model/cart');
const FavouriteProducts = require('../model/favouriteProducts');

module.exports.registerUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    city,
    address,
    postalCode,
  } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) {
      return res.status(500).json({
        message: 'Something went wrong',
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      city,
      address,
      postalCode,
      phoneNumber,
    });
    await newUser.save();

    const userCart = new Cart({
      userId: newUser._id.toString(),
      products: [],
    });
    await userCart.save();

    const favProducts = new FavouriteProducts({
      userId: newUser._id.toString(),
      products: [],
    });
    await favProducts.save();

    req.user = newUser;
    const token = jwt.sign(
      {
        user: newUser,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Someting went wrong',
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordMatching = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordMatching) {
      return res.status(403).json({
        message: 'Wrong password',
      });
    }

    req.user = foundUser;
    const token = jwt.sign(
      {
        user: foundUser,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
};
