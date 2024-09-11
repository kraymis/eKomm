const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');


// Get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get a single product by ID
const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return { status: 404, data: { message: 'Product not found' } };
    }
    return { status: 200, data: product };
  } catch (err) {
    return { status: 500, data: { message: 'Server error' } };
  }
};


// Create a new product (admin only)
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// Function to get the latest 8 products
const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .sort({ createdAt: -1 }) // Sort by creation date in descending order
    .limit(8); // Limit to 8 products
  res.json(products);
});

const getAllCategories = async (req, res) => {
  try {
    console.log('Fetching categories...');
    const categories = await Product.distinct('category');
    console.log('Categories:', categories);
    res.json(categories);

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get related products by category
const getRelatedProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Find products with the same category and limit to 8
    const relatedProducts = await Product.find({ category: categoryId })
      .limit(8);
    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = {
  getLatestProducts,
  getRelatedProductsByCategory,
  getProducts,
  getProductById,
  createProduct,
  getAllCategories
};
