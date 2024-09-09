const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByUser } = require('../controllers/orderControllers');
const protect = require('../middleware/authMiddleware');

// Create a new order (protected route)
router.post('/', protect, createOrder);

// Get all orders for the user (protected route)
router.get('/', protect, getOrdersByUser);

module.exports = router;
