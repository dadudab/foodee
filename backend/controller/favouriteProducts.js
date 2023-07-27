const FavouriteProducts = require("../model/favouriteProducts");
const Product = require("../model/product");

module.exports.getFavouriteProductes = async (req, res) => {
  const userId = req.user._id.toString();

  try {
    const favProducts = await FavouriteProducts.findOne({ userId }).populate(
      "products"
    );
    return res.status(200).json(favProducts.products);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.addToFavouriteProducts = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id.toString();

  try {
    const foundProduct = await Product.findById(productId);
    if (!foundProduct) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    const favouriteProducts = await FavouriteProducts.findOne({
      userId,
    }).populate("products");

    const exisitingProduct = favouriteProducts.products.find(
      (product) => product._id.toString() === productId
    );

    console.log(exisitingProduct);
    if (exisitingProduct) {
      return res.status(200).json(favouriteProducts.products);
    }

    favouriteProducts.products.push(foundProduct);
    const updatedProducts = favouriteProducts.products;
    const updatedFavProducts = {
      products: updatedProducts,
    };
    const updatedData = await FavouriteProducts.findOneAndUpdate(
      { userId },
      updatedFavProducts,
      {
        new: true,
      }
    ).populate("products");

    return res.status(200).json(updatedData.products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.removeFromFavouriteProducts = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id.toString();

  try {
    const favouriteProducts = await FavouriteProducts.findOne({
      userId,
    }).populate("products");

    const foundProduct = await Product.findById(productId);
    if (!foundProduct) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    const exisitingProduct = favouriteProducts.products.find(
      (product) => product._id.toString() === productId
    );

    if (exisitingProduct) {
      let updatedProducts = favouriteProducts.products;
      updatedProducts.pop(exisitingProduct);

      const updatedFavProducts = {
        products: updatedProducts,
      };

      const updatedData = await FavouriteProducts.findOneAndUpdate(
        { userId },
        updatedFavProducts,
        { new: true }
      ).populate("products");

      return res.status(200).json(updatedData.products);
    }

    return res.status(200).json(favouriteProducts.products);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
