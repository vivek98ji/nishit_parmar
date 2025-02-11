import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    wallet: { type: Number, default: 100 }, // Bonus on signup
    referralCode: { type: String, unique: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Reference to another user
    role: { type: String, enum: ["admin", "client", "service"], default: "client" }, // User roles
    isActive: { type: Boolean, default: true }, // Status flag
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
