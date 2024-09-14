const Order = require('../models/Order'); // Adjust the path to your Order model

// Place Order Function
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the token

    const {
      cartItems,
      total,
      paymentMethod,
      firstName,
      lastName,
      company,
      country,
      streetAddress,
      city,
      province,
      zipCode,
      phone,
      email,
      additionalInfo
    } = req.body;

    // Create a new order
    const newOrder = new Order({
      user: userId,
      cartItems,
      total,
      paymentMethod,
      firstName,
      lastName,
      company,
      country,
      streetAddress,
      city,
      province,
      zipCode,
      phone,
      email,
      additionalInfo
    });

    await newOrder.save();
    res.status(201).json(newOrder); // Respond with the created order
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get Orders Function
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the token
    console.log(userId);

    // Fetch all orders for the user
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }); // Sort by most recent first

    if (!orders) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders); // Respond with the user's orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get All Orders (for all users)
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders in the system
    const allOrders = await Order.find().sort({ createdAt: -1 }); // Sort by most recent first

    if (!allOrders || allOrders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(allOrders); // Respond with all orders
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};