const express = require('express');
const router = express.Router();
const { getProducts, getProductById ,createProduct} = require('../controllers/productControllers');

// Get all products
router.get('/', getProducts);

// Get a single product by ID
router.get('/:id', getProductById);

router.post('/', createProduct);


module.exports = router;
