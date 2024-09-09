import axios from 'axios';

const API_URL = 'https://localhost:5000/api';

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};
