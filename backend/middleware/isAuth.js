const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports.isAuth = async (req, res, next) => {
  try {
    if(req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decodedToken.user._id);

      req.user = await User.findById(decodedToken.user._id);
      // console.log(req.user);

      return next();
    }

    return res.status(401).json({
      message: 'You must be log in'
    });
  } catch (error) {
    return res.status(401).json({
      message: 'You must be log in'
    });
  }
}
