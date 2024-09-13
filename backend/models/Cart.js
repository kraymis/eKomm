const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Product sub-schema for cart items
const productSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Reference to Product model
    required: true
  },
  name: String,
  price: Number,
  quantity: Number,
  image: String
});

// Define Cart schema
const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
    ref: 'User',
    required: true
  },
  cartItems: [productSchema],  // List of products in the cart
  total: { type: Number, required: true },  // Total price for the cart
  updatedAt: { type: Date, default: Date.now }  // Track when the cart was last updated
});

module.exports = mongoose.model('Cart', cartSchema);
