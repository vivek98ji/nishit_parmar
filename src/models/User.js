import { Phone } from 'lucide-react';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: String }, // Allow string IDs
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  wallet: { type: Number, default: 0 },
  referralCode: { type: String },
  refferedBy: { type: String },
  referralCount: { type: Number, default: 0 },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  key: { type: String },
});

export default mongoose.models.User || mongoose.model('User', userSchema);