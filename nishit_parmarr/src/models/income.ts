import mongoose, { Schema, Document } from "mongoose";

export interface IIncome extends Document {
  name: string;
  earnings: number;
  productId: string;
  customerId: string;
  orders: number;
  avgOrderValue: number;
}

const IncomeSchema = new Schema<IIncome>(
  {
    name: { type: String, required: true },
    earnings: { type: Number, required: true },
    productId: { type: String, required: true },
    customerId: { type: String, required: true },
    orders: { type: Number, required: true },
    avgOrderValue: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Income || mongoose.model<IIncome>("Income", IncomeSchema);
