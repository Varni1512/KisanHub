import mongoose from 'mongoose';

const rentalRequestSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'RentalItem', required: true },
    renter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    durationUnit: { type: String, default: 'Day' },
    phone: { type: String, default: '' },
    renterName: { type: String, default: '' },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Accepted', 'Rejected'] },
  },
  { timestamps: true }
);

export default mongoose.model('RentalRequest', rentalRequestSchema);
