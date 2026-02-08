import mongoose from 'mongoose';

const rentalItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, default: 'TRACTOR', enum: ['TRACTOR', 'HARVESTER', 'IRRIGATION', 'OTHER'] },
    price: { type: Number, required: true },
    unit: { type: String, default: 'Day', enum: ['Day', 'Hour', 'Acre'] },
    img: { type: String, default: '' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, default: '' },
    status: { type: String, default: 'Available', enum: ['Available', 'Booked'] },
  },
  { timestamps: true }
);

export default mongoose.model('RentalItem', rentalItemSchema);
