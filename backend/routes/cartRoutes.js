const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCartItemQuantity, deleteCartItem,getCartItemCount} = require('../controllers/cartControllers');
const protect  = require('../middleware/authMiddleware'); // Middleware for checking the token

// Add product to cart
router.post('/add',protect,addToCart);
// Get cart items
router.get('/', protect, getCart);

// Update item quantity in cart
router.patch('/:id', protect, updateCartItemQuantity);

// Delete item from cart
router.delete('/:id', protect, deleteCartItem);

router.get('/items-count', protect, getCartItemCount);


module.exports = router;
