import mongoose from "mongoose";

const ServiceRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, default: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Service provider (Partner)
  },
  { timestamps: true }
);

export default mongoose.models.ServiceRequest || mongoose.model("Service", ServiceRequestSchema);