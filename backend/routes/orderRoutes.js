const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderControllers'); // Adjust the path to your controller
const protect = require('../middleware/authMiddleware');

// Place Order Route
router.post('/', protect, placeOrder);

module.exports = router;