import mongoose from 'mongoose';

const farmerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, default: '' },
    location: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    landSize: { type: String, default: '' },
    primaryCrops: [{ type: String }],
    experience: { type: String, default: '' },
    profileImg: { type: String, default: '' },
    totalEarnings: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('FarmerProfile', farmerProfileSchema);
