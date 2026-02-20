import express from 'express';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/orders/farmer/:farmerId - Orders for farmer
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.params.farmerId })
      .populate('shopkeeper', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders/shop/:shopkeeperId - Orders for shopkeeper
router.get('/shop/:shopkeeperId', async (req, res) => {
  try {
    const orders = await Order.find({ shopkeeper: req.params.shopkeeperId })
      .populate('farmer', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/orders - Place order (Farmer)
router.post('/', async (req, res) => {
  try {
    const { farmer, shopkeeper, items, shippingAddress, phone, paymentMethod } = req.body;
    if (!farmer || !shopkeeper || !items?.length || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Provide farmer, shopkeeper, items, shippingAddress',
      });
    }
    let total = 0;
    const orderItems = [];
    for (const it of items) {
      const product = await Product.findById(it.product);
      if (!product) throw new Error(`Product ${it.product} not found`);
      const qty = Number(it.qty) || 1;
      if (product.stock < qty) {
        throw new Error(`Insufficient stock for ${product.name}. Available: ${product.stock}`);
      }
      const price = product.price * qty;
      total += price;
      orderItems.push({
        product: product._id,
        name: product.name,
        qty,
        unit: product.unit,
        price: product.price,
        img: product.img,
      });
      product.stock -= qty;
      await product.save();
    }
    const paymentMethodVal = paymentMethod || 'COD';
    const order = await Order.create({
      farmer,
      shopkeeper,
      items: orderItems,
      total,
      shippingAddress,
      phone: phone || '',
      paymentMethod: paymentMethodVal,
      paymentStatus: paymentMethodVal === 'COD' ? 'Pending' : 'Pending',
    });
    const populated = await Order.findById(order._id).populate('farmer', 'name email');
    res.status(201).json({ success: true, order: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/orders/:id/status - Update order status (Shopkeeper)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (status === 'Cancelled') {
      const Product = (await import('../models/Product.js')).default;
      for (const it of order.items) {
        await Product.findByIdAndUpdate(it.product, { $inc: { stock: it.qty } });
      }
    }
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('farmer', 'name email');
    res.json({ success: true, order: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
