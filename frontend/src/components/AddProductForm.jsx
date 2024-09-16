import React, { useState, useEffect } from 'react';
import { uploadImagesToCloudinary } from '../services/api';

const AddProductForm = ({ onClose, onConfirm,productToEdit  }) => {
    const [product, setProduct] = useState({
      name: '',
      description: '',
      price: '',
      images: [],
      availableSizes: [],
      availableColors: [],
      stockQuantity: '',
      category: '',
    });
    const [imageFiles, setImageFiles] = useState([]); // For storing image files locally

  
    useEffect(() => {
      if (productToEdit) {
        setProduct(productToEdit);
      } else {
        setProduct({
          name: '',
          description: '',
          price: '',
          images: [],
          availableSizes: [],
          availableColors: [],
          stockQuantity: '',
          category: '',
        });
      }
    }, [productToEdit]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
      console.log(product)
    };

    const handleImageUpload = async () => {
      const uploadedImages = [];
      for (let i = 0; i < imageFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', imageFiles[i]);
        formData.append('upload_preset', 'your_cloudinary_preset'); // Cloudinary preset
        const uploadedImageUrl = await uploadImagesToCloudinary(formData);
        uploadedImages.push(uploadedImageUrl); // Assuming the API returns the image URL
      }
      console.log(uploadedImages);
      return uploadedImages;
    };


    const handleConfirm = async () => {
      if (imageFiles.length > 0) {
        const uploadedImages = await handleImageUpload();
        console.log(uploadedImages);
    
        // Update the product state with the uploaded images
        setProduct((prevProduct) => {
          const updatedProduct = {
            ...prevProduct,
            images: uploadedImages,
          };
    
          // Now, ensure the updated product is passed to onConfirm
          onConfirm(updatedProduct);
          return updatedProduct;
        });
      } else {
        // If no images, directly confirm with the current product state
        onConfirm(product);
      }
    };
    
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full h-[90vh] overflow-auto">
          <h2 className="text-2xl font-bold mb-4">{productToEdit ? 'Update Product' : 'Add New Product'}</h2>
  
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-gray-700">Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-gray-700">Available Sizes (comma-separated)</label>
            <input
              type="text"
              name="availableSizes"
              value={product.availableSizes.join(', ')}
              onChange={(e) =>
                setProduct({
                  ...product,
                  availableSizes: e.target.value.split(',').map((size) => size.trim()),
                })
              }
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
            />
          </div>
  
          <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Upload Product Images</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImageFiles([...e.target.files])}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
          />
          </div>
  
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-gray-700">Available Colors</label>
            {product.availableColors.map((color, index) => (
              <div key={index} className="flex items-center mb-2 space-x-2">
                <input
                  type="text"
                  value={color.colorName}
                  placeholder="Color Name"
                  onChange={(e) => {
                    const newColors = [...product.availableColors];
                    newColors[index].colorName = e.target.value;
                    setProduct({ ...product, availableColors: newColors });
                  }}
                  className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
                />
                <input
                  type="text"
                  value={color.hexCode}
                  placeholder="Hex Code"
                  onChange={(e) => {
                    const newColors = [...product.availableColors];
                    newColors[index].hexCode = e.target.value;
                    setProduct({ ...product, availableColors: newColors });
                  }}
                  className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newColors = product.availableColors.filter((_, i) => i !== index);
                    setProduct({ ...product, availableColors: newColors });
                  }}
                  className="ml-2 bg-red-500 text-white px-3 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setProduct({
                  ...product,
                  availableColors: [...product.availableColors, { colorName: '', hexCode: '' }],
                })
              }
              className="bg-[#B88E2F] text-white px-4 py-2 mt-2 rounded-lg w-full hover:bg-[#9a771e] transition"
            >
              Add Color
            </button>
          </div>
  
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2 text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
            />
          </div>
  
  
  
          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirm} 
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {productToEdit ? 'Update' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    );
  };

export default AddProductForm;