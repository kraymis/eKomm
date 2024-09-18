// controllers/adminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && await bcrypt.compare(password, admin.password)) {
        res.status(200).json({
            _id: admin._id,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid admin credentials' });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


const registerAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if all fields are provided
      if (!email || !password) {
        return res.status(400).json({ error: 'Please fill all fields' });
      }
  
      // Check if admin already exists
      const adminExists = await Admin.findOne({ email });
      if (adminExists) {
        return res.status(400).json({ error: 'Admin already exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create and save the new admin
      const admin = new Admin({ email, password: hashedPassword });
      await admin.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Admin created successfully' });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
module.exports = { adminLogin,registerAdmin };
