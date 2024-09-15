const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAuthenticatedUser,addToFavorites,removeFromFavorites,isProductFavorite,getFavorites } = require('../controllers/userControllers');
const protect = require('../middleware/authMiddleware');

// User registration route
router.post('/signup', registerUser);

// User login route
router.post('/login', loginUser);

// Get current user profile (protected route)
router.get('/me', protect, getAuthenticatedUser);

// Route to add a product to favorites
router.post('/favorites/add', protect, addToFavorites);

// Route to remove a product from favorites
router.post('/favorites/remove', protect, removeFromFavorites);

router.get('/contains/:productId', protect, isProductFavorite);  // Check if product is in favorites

// Get user's favorite items
router.get('/favorites', protect, getFavorites);

module.exports = router;
