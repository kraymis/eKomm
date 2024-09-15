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
      quantity: quantity || 1,
      image:product.images[0]

    });
  }

  // Recalculate the total price
  cart.total = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Save the cart
  await cart.save();

  res.status(200).json({ message: 'Product added to cart', cart });
});

// Get cart items for the user
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  
  if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
  }

  res.json(cart);
});

// Update item quantity in cart
const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
  }

  const itemIndex = cart.cartItems.findIndex(item => item._id.toString() === req.params.id);
  if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
  }

  cart.cartItems[itemIndex].quantity = quantity;
  cart.total = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  await cart.save();

  res.json(cart);
});

// Delete item from cart
const deleteCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
  }

  const itemIndex = cart.cartItems.findIndex(item => item._id.toString() === req.params.id);
  if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
  }

  cart.cartItems.splice(itemIndex, 1);
  cart.total = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  await cart.save();

  res.json({ message: 'Item removed from cart', cart });
});

const getCartItemCount = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  // Calculate total number of items in the cart
  const itemCount = cart.cartItems.length;

  res.json({ count: itemCount });
});

const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  // Clear all cart items
  cart.cartItems = [];
  cart.total = 0;

  await cart.save();

  res.json({ message: 'Cart cleared successfully' });
});

// Check if product is in cart
const isProductInCart = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  const cart = await Cart.findOne({ user: userId });

  if (cart) {
    const itemExists = cart.cartItems.some((item) => item.productId.toString() === productId);
    res.json({ inCart: itemExists });
  } else {
    res.json({ inCart: false });
  }
};

module.exports = {
  isProductInCart,
  clearCart,
  getCartItemCount,
  addToCart,
  getCart,
  updateCartItemQuantity,
  deleteCartItem
};