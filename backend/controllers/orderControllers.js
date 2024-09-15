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
    console.log(req.body);

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

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ); // Find order by ID and update status

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
