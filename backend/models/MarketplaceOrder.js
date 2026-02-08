import mongoose from 'mongoose';

const marketplaceItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'FarmerProduct' },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  unit: { type: String, default: 'Kg' },
  price: { type: Number, required: true },
  img: { type: String, default: '' },
});

const marketplaceOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [marketplaceItemSchema],
    total: { type: Number, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Completed', 'Cancelled'] },
    shippingAddress: { type: String, required: true },
    phone: { type: String, default: '' },
    paymentMethod: { type: String, default: 'COD', enum: ['COD', 'Online'] },
    paymentStatus: { type: String, default: 'Pending', enum: ['Pending', 'Paid'] },
    razorpayOrderId: { type: String, default: '' },
    razorpayPaymentId: { type: String, default: '' },
  },
  { timestamps: true }
);

marketplaceOrderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    const count = await mongoose.model('MarketplaceOrder').countDocuments();
    this.orderId = `#MP-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

export default mongoose.model('MarketplaceOrder', marketplaceOrderSchema);
