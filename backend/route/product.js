const express = require('express');
const router = express.Router();
const { getProducts, createProduct, updateProduct, getProduct, deleteProduct } = require('../controller/product');
const { isAdmin } = require('../middleware/isAdmin');
const { isAuth } = require('../middleware/isAuth');

router.get('/products', getProducts);
router.post('/products/new', isAuth, isAdmin, createProduct);
router.get('/products/:productId', getProduct);
router.put('/products/:productId/update', isAuth, isAdmin, updateProduct);
router.delete('/products/:productId/delete', isAuth, isAdmin, deleteProduct);

module.exports = router;
