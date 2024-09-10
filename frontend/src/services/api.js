import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
