const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');


// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const { items, total } = req.body;

  const order = await Order.create({
    user: req.user._id,
    items,
    total,
    status: 'pending',
  });

  res.status(201).json(order);
});
const getOrdersByUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: 'No orders found for this user' });
  }
});
// Get user's orders
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

module.exports = {
  createOrder,
  getOrders,
  getOrdersByUser
};
