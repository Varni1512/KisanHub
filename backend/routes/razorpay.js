import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';

const router = express.Router();

const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

// POST /api/razorpay/create-order - Create Razorpay order for existing KisanHub order
router.post('/create-order', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env',
      });
    }
    const { orderId } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Order ID required' });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    const amountInPaise = Math.round(order.total * 100);
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: order.orderId || orderId,
    };
    const razorpayOrder = await razorpay.orders.create(options);
    await Order.findByIdAndUpdate(orderId, { razorpayOrderId: razorpayOrder.id });
    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: order.total,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/razorpay/verify-payment - Verify payment and update order
router.post('/verify-payment', async (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'Paid',
        razorpayPaymentId: razorpay_payment_id,
      },
      { new: true }
    ).populate('farmer', 'name email');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
