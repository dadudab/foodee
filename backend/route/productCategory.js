const express = require('express');
const { getProductCategories, createProductCategory, updateProductCategory, deleteProductCategory } = require('../controller/productCategory');
const { isAdmin } = require('../middleware/isAdmin');
const { isAuth } = require('../middleware/isAuth');
const router = express.Router();


router.get('/product-category', getProductCategories);
router.post('/product-category/new', isAuth, isAdmin, createProductCategory);
router.put('/product-category/:productCategoryId/update', isAuth, isAdmin, updateProductCategory);
router.delete('/product-category/:productCategoryId/delete', isAuth, isAdmin, deleteProductCategory);

module.exports = router;
