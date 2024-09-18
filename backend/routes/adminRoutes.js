// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminLogin } = require('../controllers/adminController');

// Admin login route
router.post('/login', adminLogin);
router.post('/register', registerAdmin);


module.exports = router;
