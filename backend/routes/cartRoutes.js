const express = require('express');
const router = express.Router();
const { getCart, addItemToCart, removeFromCart } = require('../controllers/cartControllers');
const protect = require('../middleware/authMiddleware');

// Get the user's cart (protected route)
router.get('/', protect, getCart);

// Add an item to the cart (protected route)
router.post('/add', protect, addItemToCart);

// Remove an item from the cart (protected route)
router.delete('/remove/:id', protect, removeFromCart);

module.exports = router;
