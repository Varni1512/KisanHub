import express from 'express';
import FarmerProfile from '../models/FarmerProfile.js';

const router = express.Router();

// GET /api/farmer-profile/:userId
router.get('/:userId', async (req, res) => {
  try {
    let profile = await FarmerProfile.findOne({ user: req.params.userId });
    if (!profile) {
      profile = await FarmerProfile.create({
        user: req.params.userId,
        name: '',
        location: '',
        phone: '',
        email: '',
        landSize: '',
        primaryCrops: [],
        experience: '',
      });
    }
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/farmer-profile/:userId
router.put('/:userId', async (req, res) => {
  try {
    const { name, location, phone, email, landSize, primaryCrops, experience, profileImg } = req.body;
    let profile = await FarmerProfile.findOne({ user: req.params.userId });
    if (!profile) {
      profile = await FarmerProfile.create({
        user: req.params.userId,
        ...req.body,
      });
    } else {
      if (name !== undefined) profile.name = name;
      if (location !== undefined) profile.location = location;
      if (phone !== undefined) profile.phone = phone;
      if (email !== undefined) profile.email = email;
      if (landSize !== undefined) profile.landSize = landSize;
      if (primaryCrops !== undefined) profile.primaryCrops = primaryCrops;
      if (experience !== undefined) profile.experience = experience;
      if (profileImg !== undefined) profile.profileImg = profileImg;
      await profile.save();
    }
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
