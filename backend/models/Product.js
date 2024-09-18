// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the product schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  short_description: {
    type: String,
    required: true
  },
  long_description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: [
    {
      type: String  // Array of image URLs for the product
    }
  ],
  availableSizes: [
    {
      type: String  // List of available sizes (e.g., 'S', 'M', 'L', 'XL')
    }
  ],
  availableColors: [
    {
      colorName: { type: String },  // Color name (e.g., 'Red', 'Blue')
      hexCode: { type: String }     // Hex color code for the color
    }
  ],
  stockQuantity: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: String,
    required: true
  },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to User who rated the product
      rating: { type: Number, min: 1, max: 5 },
      review: { type: String }
    }
  ],
  averageRating: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
