// auth.js
export const isAuthenticated = () => {
    // Assuming you store a JWT token in localStorage
    const token = localStorage.getItem('token'); // or sessionStorage/cookies
    return !!token;  // Returns true if token exists, false otherwise
};

export const signOut = (navigate) => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login or home page
    navigate('/login');
};

// auth.js
export const isAdminAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    // Check if token exists and is valid
    return !!token;
};

