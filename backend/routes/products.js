import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products - All products (for Farmer Agro Medicine page)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('shopkeeper', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/shop/:shopkeeperId - Products by shopkeeper
router.get('/shop/:shopkeeperId', async (req, res) => {
  try {
    const products = await Product.find({ shopkeeper: req.params.shopkeeperId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products - Add product (Shopkeeper)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, stock, unit, img, shopkeeper } = req.body;
    if (!name || !category || !price || stock === undefined || !shopkeeper) {
      return res.status(400).json({
        success: false,
        message: 'Provide name, category, price, stock, shopkeeper',
      });
    }
    const product = await Product.create({
      name,
      category,
      price: Number(price),
      stock: Number(stock),
      unit: unit || 'Bag',
      img: img || '',
      shopkeeper,
    });
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
