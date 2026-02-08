import express from 'express';
import RentalRequest from '../models/RentalRequest.js';
import RentalItem from '../models/RentalItem.js';

const router = express.Router();

// GET /api/rental-requests/owner/:ownerId - Requests for owner's items
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const requests = await RentalRequest.find({ owner: req.params.ownerId })
      .populate('item', 'name type price unit img')
      .populate('renter', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/rental-requests/renter/:renterId - Requests made by renter
router.get('/renter/:renterId', async (req, res) => {
  try {
    const requests = await RentalRequest.find({ renter: req.params.renterId })
      .populate('item', 'name type price unit img')
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/rental-requests - Create rental request
router.post('/', async (req, res) => {
  try {
    const { item, renter, startDate, duration, durationUnit, phone, renterName } = req.body;
    if (!item || !renter || !startDate || !duration) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const rentalItem = await RentalItem.findById(item);
    if (!rentalItem) return res.status(404).json({ success: false, message: 'Rental item not found' });
    if (rentalItem.status === 'Booked') {
      return res.status(400).json({ success: false, message: 'Item is already booked' });
    }
    const request = await RentalRequest.create({
      item, renter, owner: rentalItem.owner, startDate, duration,
      durationUnit: durationUnit || 'Day', phone: phone || '', renterName: renterName || '',
    });
    const populated = await RentalRequest.findById(request._id)
      .populate('item', 'name type price unit img')
      .populate('renter', 'name email')
      .populate('owner', 'name email');
    res.status(201).json({ success: true, request: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/rental-requests/:id/respond - Accept or Reject
router.put('/:id/respond', async (req, res) => {
  try {
    const { status } = req.body; // 'Accepted' | 'Rejected'
    if (!['Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const reqDoc = await RentalRequest.findById(req.params.id);
    if (!reqDoc) return res.status(404).json({ success: false, message: 'Request not found' });
    reqDoc.status = status;
    await reqDoc.save();
    if (status === 'Accepted') {
      await RentalItem.findByIdAndUpdate(reqDoc.item, { status: 'Booked' });
    }
    const populated = await RentalRequest.findById(reqDoc._id)
      .populate('item', 'name type price unit img')
      .populate('renter', 'name email')
      .populate('owner', 'name email');
    res.json({ success: true, request: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
