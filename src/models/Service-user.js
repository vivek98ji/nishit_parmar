import mongoose from "mongoose";

const ServiceUserSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    available: Boolean,
    providerId: String,
    comments: String,
    imageUrl: String,
    serviceDetails: [String],
});

export default mongoose.models.Service_user || mongoose.model("Service_user", ServiceUserSchema);
