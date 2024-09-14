const express = require('express');
const router = express.Router();
const { placeOrder,getOrders,getAllOrders } = require('../controllers/orderControllers'); // Adjust the path to your controller
const protect = require('../middleware/authMiddleware');

// Place Order Route
router.post('/', protect, placeOrder);
router.get('/', protect, getOrders); // New route for fetching orders
router.get('/all', protect, getAllOrders);


module.exports = router;