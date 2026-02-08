import express from 'express';
import FarmerProduct from '../models/FarmerProduct.js';

const router = express.Router();

// GET /api/farmer-products - All products (for marketplace browse)
router.get('/', async (req, res) => {
  try {
    const products = await FarmerProduct.find()
      .populate('farmer', 'name email state')
      .sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/farmer-products/my/:farmerId - Products by farmer
router.get('/my/:farmerId', async (req, res) => {
  try {
    const products = await FarmerProduct.find({ farmer: req.params.farmerId })
      .sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/farmer-products - Add product (farmer only)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, unit, stock, img, farmer, location } = req.body;
    if (!name || !category || !price || stock === undefined || !farmer) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const product = await FarmerProduct.create({
      name, category, price, unit: unit || 'Kg', stock: stock || 0,
      img: img || '', farmer, location: location || '',
    });
    const populated = await FarmerProduct.findById(product._id).populate('farmer', 'name email state');
    res.status(201).json({ success: true, product: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/farmer-products/:id
router.put('/:id', async (req, res) => {
  try {
    const product = await FarmerProduct.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('farmer', 'name email state');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/farmer-products/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await FarmerProduct.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
