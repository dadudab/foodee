const Order = require("../model/order");
const Cart = require("../model/cart");

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    return res.status(200).json(orders);
  } catch (errror) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.getMyOrders = async (req, res) => {
  const user = req.user;
  const userId = user._id.toString();

  try {
    const myOrders = await Order.find({ userId }).populate("user");
    return res.status(200).json(myOrders);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.createOrder = async (req, res) => {
  const user = req.user;
  const userId = req.user._id.toString();

  try {
    const cart = await Cart.findOne({ userId });
    const orderedProducts = [];
    for (let product of cart.products) {
      const orderedProduct = {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        productId: product.productId,
      };
      orderedProducts.push(orderedProduct);
    }

    const order = new Order({
      userId: userId,
      user: user,
      products: orderedProducts,
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalQuantity,
    });
    await order.save();

    // await Cart.findOneAndUpdate(
    //   { userId: userId },
    //   {
    //     products: [],
    //     totalQuantity: 0,
    //     totalPrice: 0.0,
    //   }
    // );
    cart.products = [];
    cart.totalQuantity = 0;
    cart.totalPrice = 0.0;
    await cart.save();

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
