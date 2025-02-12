import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema(
  {
    title: String,
    client: String,
    status: String,
    price: Number,
    startDate: String,
    dueDate: String,
    completed: Boolean,
    completedDate: String,
    address: String,
    description: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema)