import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['FINANCIAL', 'INSURANCE', 'INFRASTRUCTURE'],
    },
    status: { type: String, required: true, default: 'ONGOING' },
    detail: { type: String, required: true, trim: true },
    apply: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    docs: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model('Scheme', schemeSchema);
