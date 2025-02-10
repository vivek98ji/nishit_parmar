import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    serviceId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Service", 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },
    time: { 
      type: String, 
      required: true, 
      trim: true 
    },
    status: { 
      type: String, 
      enum: ["Pending", "Confirmed", "Completed"], 
      default: "Pending",
      required: true
    },
    remarks: { 
      type: String, 
      default: "", 
      trim: true 
    },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
