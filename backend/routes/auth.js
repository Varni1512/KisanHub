import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Role to frontend route mapping (must match frontend routes)
const ROLE_TO_ROUTE = {
  Farmer: '/farmer',
  User: '/user',
  Seller: '/seller',
  'Medicine Shopkeeper': '/medicine',
  Admin: '/admin',
};

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, state } = req.body;

    if (!name || !email || !password || !role || !state) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, password, role, and state',
      });
    }

    if (!ROLE_TO_ROUTE[role]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role selected',
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
      state,
    });

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      state: user.state,
      route: ROLE_TO_ROUTE[user.role],
    };

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      state: user.state,
      route: ROLE_TO_ROUTE[user.role],
    };

    res.json({
      success: true,
      message: 'Login successful',
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

export default router;
