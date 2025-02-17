import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "service_users", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
