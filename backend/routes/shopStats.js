import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

// GET /api/shop-stats/:shopkeeperId - Dashboard stats
router.get('/:shopkeeperId', async (req, res) => {
  try {
    const [productCount, orderCount, pendingCount, completedOrders] = await Promise.all([
      Product.countDocuments({ shopkeeper: req.params.shopkeeperId }),
      Order.countDocuments({ shopkeeper: req.params.shopkeeperId }),
      Order.countDocuments({ shopkeeper: req.params.shopkeeperId, status: 'Pending' }),
      Order.find({ shopkeeper: req.params.shopkeeperId, status: 'Completed' }),
    ]);
    const totalRevenue = completedOrders.reduce((s, o) => s + o.total, 0);
    const recentOrders = await Order.find({ shopkeeper: req.params.shopkeeperId })
      .populate('farmer', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    const lowStockProducts = await Product.find({
      shopkeeper: req.params.shopkeeperId,
      stock: { $lt: 10 },
    }).limit(3);
    res.json({
      success: true,
      stats: {
        totalProducts: productCount,
        totalOrders: orderCount,
        pendingOrders: pendingCount,
        totalRevenue,
      },
      recentOrders,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
