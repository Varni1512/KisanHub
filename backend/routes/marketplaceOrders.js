import express from 'express';
import MarketplaceOrder from '../models/MarketplaceOrder.js';
import FarmerProduct from '../models/FarmerProduct.js';

const router = express.Router();

// GET /api/marketplace-orders/buyer/:buyerId - Orders placed by user
router.get('/buyer/:buyerId', async (req, res) => {
  try {
    const orders = await MarketplaceOrder.find({ buyer: req.params.buyerId })
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/marketplace-orders/seller/:sellerId - Orders received by farmer
router.get('/seller/:sellerId', async (req, res) => {
  try {
    const orders = await MarketplaceOrder.find({ seller: req.params.sellerId })
      .populate('buyer', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/marketplace-orders - Create order
router.post('/', async (req, res) => {
  try {
    const { buyer, items, shippingAddress, phone, paymentMethod } = req.body;
    if (!buyer || !items || items.length === 0 || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    // Group items by seller (farmer)
    const bySeller = {};
    for (const it of items) {
      const sid = it.seller;
      if (!bySeller[sid]) bySeller[sid] = [];
      bySeller[sid].push(it);
    }
    const created = [];
    for (const [sellerId, sellerItems] of Object.entries(bySeller)) {
      let total = 0;
      const orderItems = [];
      for (const it of sellerItems) {
        const prod = await FarmerProduct.findById(it.product);
        if (!prod) continue;
        const qty = Math.min(it.qty || 1, prod.stock);
        const price = prod.price;
        total += price * qty;
        orderItems.push({
          product: prod._id,
          name: prod.name,
          qty,
          unit: prod.unit || 'Kg',
          price,
          img: prod.img || '',
        });
      }
      if (orderItems.length === 0) continue;
      const order = await MarketplaceOrder.create({
        buyer,
        seller: sellerId,
        items: orderItems,
        total,
        shippingAddress,
        phone: phone || '',
        paymentMethod: paymentMethod || 'COD',
        paymentStatus: paymentMethod === 'Online' ? 'Pending' : 'Pending',
      });
      // Deduct stock
      for (const it of orderItems) {
        await FarmerProduct.findByIdAndUpdate(it.product, { $inc: { stock: -it.qty } });
      }
      const populated = await MarketplaceOrder.findById(order._id)
        .populate('buyer', 'name email')
        .populate('seller', 'name email');
      created.push(populated);
    }
    res.status(201).json({ success: true, orders: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/marketplace-orders/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await MarketplaceOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('buyer', 'name email').populate('seller', 'name email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
