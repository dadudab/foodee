const express = require('express');
const { getCart, addProductToCart, removeProductFromCart } = require('../controller/cart');
const { isAuth } = require('../middleware/isAuth');
const router = express.Router();


router.get('/cart', isAuth, getCart);
router.post('/cart/add/product/:productId', isAuth, addProductToCart);
router.delete('/cart/remove/product/:productId', isAuth, removeProductFromCart);

module.exports = router;
