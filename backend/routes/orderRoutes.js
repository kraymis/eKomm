const express = require('express');
const router = express.Router();
const { placeOrder,getAllOrders,updateOrderStatus } = require('../controllers/orderControllers'); // Adjust the path to your controller
const protect = require('../middleware/authMiddleware');

// Place Order Route
router.post('/', protect, placeOrder);
router.get('/all', getAllOrders);
router.put('/:id/status', updateOrderStatus);



module.exports = router;