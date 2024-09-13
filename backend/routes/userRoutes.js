const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getAuthenticatedUser } = require('../controllers/userControllers');
const protect = require('../middleware/authMiddleware');

// User registration route
router.post('/signup', registerUser);

// User login route
router.post('/login', loginUser);

// Get current user profile (protected route)
router.get('/me', protect, getAuthenticatedUser);

module.exports = router;
