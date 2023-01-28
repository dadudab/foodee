const Product = require("../model/product");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("productCategory");

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const foundProduct = await Product.findById(productId).populate(
      "productCategory"
    );
    if (!foundProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(foundProduct);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.createProduct = async (req, res) => {
  const {
    name,
    price,
    basicIngredients,
    productCategory,
    imageData,
    description,
  } = req.body;

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      imageData.imageString
    );
    //  const cloudinaryResponse = await cloudinary.uploader.destroy(
    //    "ratice2stzqrokysvn4r"
    //  );
    console.log(cloudinaryResponse);

    const newProduct = new Product({
      name,
      price,
      basicIngredients,
      productCategory,
      description,
      imageData: {
        imageString: null,
        imageUrl: cloudinaryResponse.url,
        imagePublicId: cloudinaryResponse.public_id,
      },
    });
    await newProduct.save();

    const newProductPopulated = await (
      await Product.findById(newProduct._id)
    ).populate("productCategory");

    return res.status(200).json(newProductPopulated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const {
    name,
    price,
    basicIngredients,
    productCategory,
    description,
    imageData,
  } = req.body;

  console.log(imageData);
  try {
    const foundProduct = await Product.findById(productId).populate(
      "productCategory"
    );
    if (!foundProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let newImageData;
    if (imageData.imageString) {
      await cloudinary.uploader.destroy(imageData.imagePublicId);
      const cloudinaryResponse = await cloudinary.uploader.upload(
        imageData.imageString
      );
      newImageData = {
        imageString: null,
        imageUrl: cloudinaryResponse.url,
        imagePublicId: cloudinaryResponse.public_id,
      };
    }

    const updatedProduct = {
      _id: productId,
      name,
      price,
      basicIngredients,
      productCategory,
      description,
      imageData: imageData.imageString === null ? imageData : newImageData,
    };
    console.log(updatedProduct);
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    }).populate("productCategory");

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Someting went rong",
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    await cloudinary.uploader.destroy(product.imageData.imagePublicId);
    await Product.findByIdAndDelete(productId);
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
