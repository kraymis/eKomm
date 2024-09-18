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
<div className="min-h-screen flex items-center justify-center bg-[#000000]">
  <div className="max-w-md w-full border border-[#d4af37] p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 bg-[#3333]">
    <h1 className="text-3xl font-semibold mb-8 text-center text-[#d4af37] tracking-wider">
      Admin Login
    </h1>
    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-[#f3eacb] text-sm font-semibold mb-2" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none border border-gray-400 rounded-lg w-full py-3 px-4 bg-[#f2f2f2] text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
        />
      </div>
      <div className="mb-6">
        <label className="block text-[#f3eacb] text-sm font-semibold mb-2" htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="appearance-none border border-gray-400 rounded-lg w-full py-3 px-4 bg-[#f2f2f2] text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-[#d4af37] hover:bg-[#bfa22e] text-white font-semibold py-2 px-6 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-[#d4af37] transition"
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
