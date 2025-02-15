import mongoose, { Schema, Document } from "mongoose";

export interface IMail extends Document {
  type: string;
  subject: string;
  sender: string;
  recipient: string;
  preview: string;
  date: Date;
  isRead: boolean;
  isStarred: boolean;
  priority?: string;
  orderID?: string;
  providerId?: string;
  isAdminSent: boolean;
}

const MailSchema = new Schema<IMail>(
  {
    type: { type: String, required: true, enum: ['inbox', 'sent'] },
    subject: { type: String, required: true },
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    preview: { type: String, required: true },
    date: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    isStarred: { type: Boolean, default: false },
    priority: { type: String, enum: ["low", "medium", "high"], required: false },
    orderID: { type: String, required: false },
    providerId: { type: String, required: false },
    isAdminSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Mail || mongoose.model<IMail>("Mail", MailSchema);