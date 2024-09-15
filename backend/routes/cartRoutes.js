const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCartItemQuantity, deleteCartItem,getCartItemCount, clearCart,isProductInCart} = require('../controllers/cartControllers');
const protect  = require('../middleware/authMiddleware'); // Middleware for checking the token

// Add product to cart
router.post('/add',protect,addToCart);
// Get cart items
router.get('/', protect, getCart);

// Update item quantity in cart
router.patch('/:id', protect, updateCartItemQuantity);

// Delete item from cart
router.delete('/:id', protect, deleteCartItem);

// Clear all items from cart
router.delete('/', protect, clearCart);

router.get('/items-count', protect, getCartItemCount);

router.get('/contains/:productId', protect, isProductInCart); // New route to check if the product is in the cart



module.exports = router;
