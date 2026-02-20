import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  unit: { type: String, default: 'Pc' },
  price: { type: Number, required: true },
  img: { type: String, default: '' },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopkeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Completed', 'Cancelled'],
    },
    shippingAddress: { type: String, required: true },
    phone: { type: String, default: '' },
    paymentMethod: { type: String, default: 'COD', enum: ['COD', 'Online'] },
    paymentStatus: { type: String, default: 'Pending', enum: ['Pending', 'Paid'] },
    razorpayOrderId: { type: String, default: '' },
    razorpayPaymentId: { type: String, default: '' },
  },
  { timestamps: true }
);

orderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderId = `#ORD-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);
