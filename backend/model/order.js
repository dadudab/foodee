const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User id is required"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number,
      },
      productId: {
        type: String,
      },
      _id: {
        _id: false,
      },
    },
  ],
  totalPrice: {
    type: Number,
  },
  totalQuantity: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
