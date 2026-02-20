import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import schemesRoutes from './routes/schemes.js';
import uploadRoutes from './routes/upload.js';
import productsRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import shopProfileRoutes from './routes/shopProfile.js';
import shopStatsRoutes from './routes/shopStats.js';
import razorpayRoutes from './routes/razorpay.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://kisanhub.vercel.app/'], credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/shop-profile', shopProfileRoutes);
app.use('/api/shop-stats', shopStatsRoutes);
app.use('/api/razorpay', razorpayRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'KisanHub API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
