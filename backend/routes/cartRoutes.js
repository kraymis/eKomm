const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartControllers');
const protect  = require('../middleware/authMiddleware'); // Middleware for checking the token

// Add product to cart
router.post('/add',protect,addToCart);

module.exports = router;
