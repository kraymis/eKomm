const cloudinary = require('../config/cloudinary');


const uploadImages = async (req, res) => {
  try {
    const uploadedImages = [];


    
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        }).end(file.buffer); // Send the file buffer
      });

      uploadedImages.push(result.secure_url); // Add the image URL to the array
      console.log(result.secure_url);
    }

    res.json({ urls: uploadedImages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const testCloudinaryUpload = async (req, res) => {
    try {
      // Use a sample image or a remote URL for testing purposes
      const result = await cloudinary.uploader.upload('https://via.placeholder.com/150');
      res.json({
        message: 'Upload successful!',
        result: result,  // This will include the URL and public ID of the uploaded image
      });
    } catch (error) {
      res.status(500).json({
        message: 'Cloudinary upload failed',
        error: error.message,
      });
    }
  };
  

module.exports = { uploadImages,testCloudinaryUpload };
