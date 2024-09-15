// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    cartItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number
      }
    ],
    total: { type: Number, default: 0 }
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'  // Reference to the Order model
    }
  ],
    // Add favorites field to store product IDs
  favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'  // Reference to the Product model
      }
  ]
});

// Create User model
module.exports = mongoose.model('User', userSchema);
