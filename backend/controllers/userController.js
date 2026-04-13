const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallbacksecret', {
    expiresIn: '30d',
  });
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle Like
exports.toggleLike = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const productId = req.params.id;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isLiked = user.likedProducts.includes(productId);

    if (isLiked) {
      user.likedProducts = user.likedProducts.filter(
        (id) => id.toString() !== productId.toString()
      );
    } else {
      user.likedProducts.push(productId);
    }

    await user.save();
    res.json(user.likedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Likes
exports.getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('likedProducts');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.likedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Account
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error('Failed to delete account:', error);
    res.status(500).json({ message: 'Server error adding deleting account' });
  }
};
