const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productControllers');

// Get all products
router.get('/', getProducts);

// Get a single product by ID
router.get('/:id', getProductById);

module.exports = router;
