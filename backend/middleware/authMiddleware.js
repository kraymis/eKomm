const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from the decoded token and exclude the password
      req.user = await User.findById(decoded.id).select('-password');

      // Continue to the next middleware
      next();
    } catch (error) {
      console.error('Error in token verification:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If no token is found in the request
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

module.exports = protect;
