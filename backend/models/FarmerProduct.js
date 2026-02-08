import mongoose from 'mongoose';

const farmerProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    unit: { type: String, default: 'Kg' },
    stock: { type: Number, required: true, default: 0 },
    img: { type: String, default: '' },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('FarmerProduct', farmerProductSchema);
