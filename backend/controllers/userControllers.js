const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if all fields are provided
      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please fill all fields' });
      }
  
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: 'User Already Exists' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create and save the new user
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
  
      // Respond with success message
      res.status(201).json({ message: 'User created' });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  


const loginUser = async (req, res) => {
      const {username,email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && ( await bcrypt.compare(password,user.password)))
      {
        res.status(201).json({ message: 'Login successfully',
            _id:user.id,
            username:user.username,
            email:user.email,
            token:generateToken(user._id)
        });

      }
      else{
        res.status(400).json({ message: 'Invalid informations' })
      }

  };

const getAuthenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Add a product to favorites
const addToFavorites = async (req, res) => {
  const { productId } = req.body; // Extract productId from the request body
  const userId = req.user._id; // Extract userId from the token (req.user)

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the product is already in the user's favorites
  if (user.favorites.includes(productId)) {
    return res.status(400).json({ message: 'Product already in favorites' });
  }

  // Add product to favorites and save
  user.favorites.push(productId);
  await user.save();

  res.status(201).json({
    message: 'Product added to favorites',
    favorites: user.favorites
  });
};

// Remove a product from favorites
const removeFromFavorites = async (req, res) => {
  const { productId } = req.body; // Extract productId from the request body
  const userId = req.user._id; // Extract userId from the token (req.user)

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the product is in the user's favorites
  if (!user.favorites.includes(productId)) {
    return res.status(400).json({ message: 'Product not found in favorites' });
  }

  // Remove the product from favorites
  user.favorites = user.favorites.filter(fav => fav.toString() !== productId);
  await user.save();

  res.status(200).json({
    message: 'Product removed from favorites',
    favorites: user.favorites
  });
};

// Check if product is in favorites
const isProductFavorite = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  const user = await User.findById(userId);

  if (user) {
    const isFavorite = user.favorites.some((fav) => fav.toString() === productId);
    res.json({ isFavorite });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getFavorites = async (req, res) => {
  try {
      const userId = req.user.id; // Extracted from token by authMiddleware
      const user = await User.findById(userId).select('favorites'); // Adjust field name if needed
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user.favorites); // Send the favorites list
  } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({ message: 'Server error' });
  }
}

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
}
module.exports = {
  getFavorites,
  isProductFavorite,
  addToFavorites,
  removeFromFavorites,
  registerUser,
  loginUser,
  getAuthenticatedUser,
  
};