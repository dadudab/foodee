const ProductCategory = require("../model/productCategory");

module.exports.getProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.find();
    return res.status(200).json(productCategories);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.getProductCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const foundCategory = await ProductCategory.findById(categoryId);
    if (!foundCategory) {
      return res.status(400).json({
        message: "Category not found",
      });
    }

    return res.status(200).json(foundCategory);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.createProductCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newProductCategory = new ProductCategory({
      name,
    });
    await newProductCategory.save();

    return res.status(200).json(newProductCategory);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.updateProductCategory = async (req, res) => {
  const { productCategoryId } = req.params;
  const { name } = req.body;

  try {
    const foundProductCategory = await ProductCategory.findById(
      productCategoryId
    );
    if (!foundProductCategory) {
      return res.status(404).json({
        message: "Product category not found",
      });
    }

    const productCategory = {
      name,
    };
    const updatedProductCategory = await ProductCategory.findByIdAndUpdate(
      productCategoryId,
      productCategory,
      {
        new: true,
      }
    );

    return res.status(200).json(updatedProductCategory);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.deleteProductCategory = async (req, res) => {
  const { productCategoryId } = req.params;

  try {
    await ProductCategory.findByIdAndDelete(productCategoryId);
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
