import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Fertilizer', 'Seeds', 'Pesticide', 'Tools'],
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    unit: { type: String, default: 'Bag', enum: ['Bag', 'Kg', 'Pkt', 'Bottle', 'Pc'] },
    img: { type: String, default: '' },
    shopkeeper: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
