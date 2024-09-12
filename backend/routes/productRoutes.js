const express = require('express');
const router = express.Router();
const { getProducts, getProductById ,createProduct,getLatestProducts, getAllCategories,getRelatedProductsByCategory,deleteProductById,deleteAllProducts} = require('../controllers/productControllers');

// Get all products
router.get('/', getProducts);
router.get('/latest', getLatestProducts);
router.get('/meow', getAllCategories);

// Get a single product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    // Call the independent function
    const result = await getProductById(id);
  
    // Respond with the status and data
    res.status(result.status).json(result.data);
  });
  
router.post('/', createProduct);
router.get('/related/:categoryId', getRelatedProductsByCategory);

router.delete('/all', deleteAllProducts);

// Route to delete a single product by ID
router.delete('/:id', deleteProductById);



// router.get('/categories', getAllCategories);


module.exports = router;
