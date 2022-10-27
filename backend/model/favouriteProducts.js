const mongoose = require('mongoose');

const favouriteProducts = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    },
  ]
});

const FavouriteProducts = mongoose.model('FavouriteProducts', favouriteProducts);
module.exports = FavouriteProducts;
