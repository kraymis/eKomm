const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Multer middleware
const { uploadImages,testCloudinaryUpload } = require('../controllers/cloudinaryController'); // Cloudinary controller

// Route to handle image uploads (max 5 images)
router.post('/upload-images', upload.array('images', 5), uploadImages);
router.get('/test-upload', testCloudinaryUpload);


module.exports = router;
