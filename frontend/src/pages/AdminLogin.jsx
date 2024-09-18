import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/api'; // Separate admin login function
import { isAdminAuthenticated } from '../utils/auth'; // Admin auth utility

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdminAuthenticated()) {
            navigate('/adminaccess');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const adminData = { email, password };
            const response = await adminLogin(adminData);
            localStorage.setItem('adminToken', response.token); // Store admin token separately
            navigate('/adminaccess');
        } catch (error) {
            setError(error.response?.data?.message || 'Admin login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0822]">
            <div className="max-w-md w-full border-2 border-[#9457eb] p-8 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                        <input 
                            id="email"
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password:</label>
                        <input 
                            id="password"
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                            type="submit" 
                            className="bg-[#4a2574] hover:bg-[#7a48b2] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
