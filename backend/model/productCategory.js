const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product category name is required'],
  }
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);
module.exports = ProductCategory;
