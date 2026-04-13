const express = require('express');
const router = express.Router();
const { getProducts, getTrendingProducts, getProductsByCategory, getOfferProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

router.get('/trending', getTrendingProducts);
router.get('/offers', getOfferProducts);
router.get('/category/:categoryName', getProductsByCategory);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
