import axios from 'axios';

const API_URL = 'https://ekomm-backend.onrender.com/api';
const getAuthToken = () => localStorage.getItem('token'); // Retrieve token from local storage


export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/signup`, userData);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, userData);
        console.log('Login response:', response.data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// api.js
export const adminLogin = async (adminData) => {
  try {
      const response = await axios.post(`${API_URL}/admin/login`, adminData);
      if (response.data.token) {
          localStorage.setItem('adminToken', response.data.token);
      }
      return response.data;
  } catch (error) {
      throw error;
  }
};


// Function to get all products
export const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

//Function to get 8 latest products
  export const getLatestProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/latest`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest products:', error);
      throw error;
    }
  };

//Function to get all categories
  export const getAllCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/products/meow`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  export const getProductDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  };

  // Function to get related products by category
export const getRelatedProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/products/related/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw error; // Rethrow to handle it in the component
  }
};

export const addToCart = async (productId, quantity) => {
  try {

    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    // Make the POST request to add the product to the cart
    const response = await axios.post(
      `${API_URL}/cart/add`,
      { productId, quantity }, // Payload with product ID and quantity
      config
    );

    console.log('Product added to cart', response.data);
    return response.data; // Return the response to handle it in the component
  } catch (error) {
    console.error('Error adding to cart', error.response?.data || error.message);
    throw error.response?.data || error.message; // Throw error to handle it in the component
  }
};


const api = axios.create({
    baseURL: API_URL, // Use the API_URL from environment variables
    headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
    },
});

export const fetchCart = async () => {
    try {
        const response = await api.get('/cart');
        console.log('Cart:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

export const updateCartItemQuantity = async (itemId, quantity) => {
    try {
        const response = await api.patch(`/cart/${itemId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error('Error updating quantity:', error);
        throw error;
    }
};

export const deleteCartItem = async (itemId) => {
    try {
        console.log('Deleting item:', itemId);
        const response = await api.delete(`/cart/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};


// Function to place an order
export const placeOrder = async (orderData) => {
  try {
    console.log('Placing order:', orderData.cartItems);
    const response = await axios.post(`${API_URL}/orders/`, orderData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}` // Include token in headers
      }
    });
    await clearCart();


    return response.data; // Return the response data for further processing
  } catch (error) {
    console.error('Error placing order:', error);
    throw error; // Propagate the error to handle it in the calling function
  }
};

const clearCart = async () => {
  try {
    await axios.delete(`${API_URL}/cart/`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}` // Include token in headers
      }
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error; // Propagate the error to handle it in the calling function
  }
};
// Function to get the authenticated user's details
export const fetchAuthenticatedUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    throw error;
  }
};

// Function to fetch the cart item count for a user
export const fetchCartItemCount = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/cart/items-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.count; // Assuming your API returns an object with a 'count' property
  } catch (error) {
    console.error('Error fetching cart item count:', error);
    throw error;
  }
};

// Products API Calls

// Add a product
export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    console.log('Product added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    console.log('Product deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Update a product
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    console.log('Product updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Orders API Calls

// Get all orders
export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/all`);
    console.log('Fetched Orders:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${id}/status`, { status });
    console.log('Order status updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};


// Add to favorites
export const addToFavorites = async (productId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    const response = await axios.post(`${API_URL}/users/favorites/add`, { productId }, config);
    console.log('Product added to favorites:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding product to favorites:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Remove from favorites
export const removeFromFavorites = async (productId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    const response = await axios.post(`${API_URL}/users/favorites/remove`, { productId }, config);
    console.log('Product removed from favorites:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error removing product from favorites:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};


export const isProductInCart = async (productId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    // Make GET request to check if the product is in the cart
    const response = await axios.get(`${API_URL}/cart/contains/${productId}`, config);
    return response.data.inCart; // Server will return true/false
  } catch (error) {
    console.error('Error checking if product is in cart:', error);
    throw error;
  }
};

export const isProductFavorite = async (productId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    };

    const response = await axios.get(`${API_URL}/users/contains/${productId}`, config);
    return response.data.isFavorite;
  } catch (error) {
    console.error('Error checking if product is favorite:', error);
    throw error;
  }
};

export const fetchFavorites = async () => {
  try {
      const token = localStorage.getItem('token'); // Adjust based on how you store the token
      const response = await axios.get(`${API_URL}/users/favorites`, {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      });
      return response.data; // Assuming the backend returns the favorites in response.data
  } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error; // Propagate the error to handle it in the calling component
  }
};

// Function to upload images to Cloudinary
export const uploadImagesToCloudinary = async (images) => {
  const formData = new FormData();
  
  // Append each image to form data
  images.forEach((image) => {
    formData.append('images', image);
  });
  console.log('formData:', formData);

  // Post images to the Cloudinary upload route
  const response = await axios.post(`${API_URL}/cloudinary/upload-images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('Cloudinary response.data:', response.data)

  return response.data.urls[0]; // Array of URLs from Cloudinary
};