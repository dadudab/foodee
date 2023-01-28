const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: mongoose.Types.ObjectId,
    ref: "ProductCategory",
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  basicIngredients: [
    {
      type: String,
      required: [true, "Basic ingredients are required"],
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
  imageData: {
    imageUrl: {
      type: String,
    },
    imageString: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
