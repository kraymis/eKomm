const express = require('express');
const router = express.Router();
const { getProducts, getProductById ,createProduct,getLatestProducts, getAllCategories,getRelatedProductsByCategory,deleteProductById,deleteAllProducts,updateProduct} = require('../controllers/productControllers');

// Get all products
router.get('/', getProducts);
router.get('/latest', getLatestProducts);
router.get('/meow', getAllCategories);
router.post('/', createProduct);
router.get('/related/:categoryId', getRelatedProductsByCategory);
router.delete('/all', deleteAllProducts);
router.delete('/:id', deleteProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProductById);
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  // Call the independent function
  const result = await getProductById(id);

  // Respond with the status and data
  res.status(result.status).json(result.data);
});




// router.get('/categories', getAllCategories);


module.exports = router;
