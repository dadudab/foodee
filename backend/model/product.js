const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Product name is required'],
   },
   price: {
      type: Number,
      required: true,
   },
   productCategory: {
      type: mongoose.Types.ObjectId,
      ref: 'ProductCategory'
   },
   basicIngredients: [
      {
         type: String,
         required: [true, 'Basic ingredients are required']
      }
   ],
   timestamp: {
      type: Date,
      default: Date.now,
   },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
