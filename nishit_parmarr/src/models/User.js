import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    wallet: { type: Number, default: 100 }, // Bonus on signup
    referralCode: { type: String, unique: true },
    referredBy: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
