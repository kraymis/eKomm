const Cart = require('../models/Cart');
const asyncHandler = require('express-async-handler');


// Get user's cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    res.json(cart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

// Add item to cart
const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  // Add or update item
  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json(cart);
});
// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params; // Product ID to remove

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    // Filter out the item to be removed
    cart.items = cart.items.filter((item) => item._id.toString() !== id);

    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
});

module.exports = {
  getCart,
  addItemToCart,
  removeFromCart
};
