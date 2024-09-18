import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/api';
import { isAuthenticated } from '../utils/auth';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // If user is authenticated, redirect to home
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const userData = { username, email, password };
            const response = await signup(userData);
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error.response.data);
            setError(error.response.data.error || 'An error occurred during signup');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1c1c1c]">
            {/* Background gradient with a subtle texture */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c1c1c] to-[#2e2a24]">
                {/* Optional: Background image */}
                <img 
                    src="/path-to-background-image.jpg" 
                    alt="background" 
                    className="object-cover w-full h-full opacity-10" 
                />
            </div>

            <div className="relative max-w-md w-full border-2 border-[#d4af37] p-8 rounded-lg shadow-md bg-[#1f1b17] backdrop-blur-md hover:scale-105 transition-transform duration-300">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Signup</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">Username:</label>
                        <input 
                            id="username"
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="shadow appearance-none border border-[#8c7853] rounded w-full py-2 px-3 bg-[#302d26] text-white leading-tight focus:outline-none focus:shadow-outline transition-colors duration-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input 
                            id="email"
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="shadow appearance-none border border-[#8c7853] rounded w-full py-2 px-3 bg-[#302d26] text-white leading-tight focus:outline-none focus:shadow-outline transition-colors duration-200"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password:</label>
                        <input 
                            id="password"
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="shadow appearance-none border border-[#8c7853] rounded w-full py-2 px-3 bg-[#302d26] text-white mb-3 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-200"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <button 
                            type="submit" 
                            className="bg-[#d4af37] hover:bg-[#f0d78c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                        >
                            Signup
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-white">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[#d4af37] hover:text-[#f0d78c] font-bold transition-colors duration-200">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
