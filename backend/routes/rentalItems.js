import express from 'express';
import RentalItem from '../models/RentalItem.js';
import RentalRequest from '../models/RentalRequest.js';

const router = express.Router();

// GET /api/rental-items - All rental items
router.get('/', async (req, res) => {
  try {
    const items = await RentalItem.find()
      .populate('owner', 'name email state')
      .sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/rental-items/my/:ownerId - Items owned by farmer
router.get('/my/:ownerId', async (req, res) => {
  try {
    const items = await RentalItem.find({ owner: req.params.ownerId })
      .sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/rental-items - Add rental item
router.post('/', async (req, res) => {
  try {
    const { name, type, price, unit, img, owner, location } = req.body;
    if (!name || !price || !owner) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const item = await RentalItem.create({
      name, type: type || 'TRACTOR', price, unit: unit || 'Day',
      img: img || '', owner, location: location || '',
    });
    const populated = await RentalItem.findById(item._id).populate('owner', 'name email state');
    res.status(201).json({ success: true, item: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/rental-items/:id
router.put('/:id', async (req, res) => {
  try {
    const item = await RentalItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/rental-items/:id
router.delete('/:id', async (req, res) => {
  try {
    const item = await RentalItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    await RentalRequest.deleteMany({ item: item._id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
