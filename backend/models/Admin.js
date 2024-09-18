// models/Admin.js (optional, or you can add an isAdmin field to User.js)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true }, // Ensure only admins are created with this schema
});

module.exports = mongoose.model('Admin', adminSchema);
