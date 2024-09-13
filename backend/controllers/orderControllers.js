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
