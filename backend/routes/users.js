import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET /api/users - Fetch all registered users (for admin dashboard)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users',
    });
  }
});

export default router;
