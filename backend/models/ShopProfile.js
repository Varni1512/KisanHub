import mongoose from 'mongoose';

const shopProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    shopName: { type: String, default: '' },
    ownerName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    category: { type: String, default: 'Fertilizers & Seeds' },
    about: { type: String, default: '' },
    status: { type: String, default: 'Open', enum: ['Open', 'Closed'] },
    bannerImg: { type: String, default: '' },
    logoImg: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('ShopProfile', shopProfileSchema);
