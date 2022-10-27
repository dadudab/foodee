const express = require('express');
const router = express.Router();
const { getFavouriteProductes, addToFavouriteProducts, removeFromFavouriteProducts } = require('../controller/favouriteProducts');
const { isAuth } = require('../middleware/isAuth');


router.get('/favourite-products', isAuth, getFavouriteProductes);
router.post('/favourite-products/:productId/add', isAuth, addToFavouriteProducts);
router.delete('/favourite-products/:productId/remove', isAuth, removeFromFavouriteProducts);

module.exports = router;
