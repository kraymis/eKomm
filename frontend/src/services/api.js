import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
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
        const response = await api.delete(`/cart/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};