import mongoose, { Schema, Document } from "mongoose";

export interface IMail extends Document {
  type: string;
  subject: string;
  sender: string;
  preview: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  priority?: string;
  orderID?: string;
}

const MailSchema = new Schema<IMail>(
  {
    type: { type: String, required: true },
    subject: { type: String, required: true },
    sender: { type: String, required: true },
    preview: { type: String, required: true },
    date: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isStarred: { type: Boolean, default: false },
    priority: { type: String, enum: ["low", "medium", "high"], required: false },
    orderID: { type: String, required: false },
    providerId: {
      type: String,
      required: true, index: true
    },
  },
  { timestamps: true }
);

export default mongoose.models.Mail || mongoose.model<IMail>("Mail", MailSchema);