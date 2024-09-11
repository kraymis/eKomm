const express = require('express');
const router = express.Router();
const { getProducts, getProductById ,createProduct,getLatestProducts, getAllCategories} = require('../controllers/productControllers');

// Get all products
router.get('/', getProducts);
router.get('/latest', getLatestProducts);
router.get('/meow', getAllCategories);

// Get a single product by ID
router.get('/:id', getProductById);

router.post('/', createProduct);

// router.get('/categories', getAllCategories);


module.exports = router;
