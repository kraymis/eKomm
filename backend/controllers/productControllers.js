const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');


// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get a single product by ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create a new product (admin only)
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
