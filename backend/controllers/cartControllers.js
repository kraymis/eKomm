const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

// Add to cart controller
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  // Find the user's cart or create a new one if it doesn't exist
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      cartItems: [],
      total: 0
    });
  }

  // Find the product to add
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if the product already exists in the cart
  const existingItem = cart.cartItems.find(item => item.productId.toString() === productId);

  if (existingItem) {
    // Update the quantity if the product exists
    existingItem.quantity += quantity || 1;
  } else {
    // Add the new product to the cart
    cart.cartItems.push({
      productId: productId,
      name: product.name,
      price: product.price,
      quantity: quantity || 1
    });
  }

  // Recalculate the total price
  cart.total = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Save the cart
  await cart.save();

  res.status(200).json({ message: 'Product added to cart', cart });
});



module.exports = {
  addToCart
};
