import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: [true, 'Business name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  serviceCategories: [{
    type: String,
    required: [true, 'At least one service category is required']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema); 