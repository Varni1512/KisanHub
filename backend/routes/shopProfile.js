import express from 'express';
import ShopProfile from '../models/ShopProfile.js';

const router = express.Router();

// GET /api/shop-profile/:userId
router.get('/:userId', async (req, res) => {
  try {
    let profile = await ShopProfile.findOne({ user: req.params.userId });
    if (!profile) {
      profile = await ShopProfile.create({ user: req.params.userId });
    }
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/shop-profile/:userId
router.put('/:userId', async (req, res) => {
  try {
    let profile = await ShopProfile.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
