const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Product sub-schema for orders
const productSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Reference to Product model
    required: true
  },
  name: String,
  price: Number,
  quantity: Number,
  image:String
});

// Define Order schema
const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
    ref: 'User',
    required: true
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: { type: String },
  country: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  zipCode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  additionalInfo: { type: String },
  cartItems: [productSchema],  // List of products in the order
  total: { type: Number, required: true },  // Total price for the order
  orderDate: { type: Date, default: Date.now },
  status: {  // New status field
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  }
});

module.exports = mongoose.model('Order', orderSchema);
