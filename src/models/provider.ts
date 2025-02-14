import mongoose, { Schema, Document } from "mongoose";

export interface IProvider extends Document {
  name: string;
  category: string;
  owner_name: string;
  contact: {
    phone: string;
    email: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zip_code: string;
  };
  bank_info: {
    bank_name: string;
    account_number: string;
    swift_code: string;
    branch_name: string;
    branch_address: string;
    identifier_code: string;
    code_number: string;
  };
  user_info: {
    user_id: string;
    username: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProviderSchema = new Schema<IProvider>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    owner_name: { type: String, required: true },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip_code: { type: String, required: true },
    },
    bank_info: {
      bank_name: { type: String, required: true },
      account_number: { type: String, required: true },
      swift_code: { type: String, required: true },
      branch_name: { type: String, required: true },
      branch_address: { type: String, required: true },
      identifier_code: { type: String, required: true },
      code_number: { type: String, required: true },
    },
    user_info: {
      user_id: { type: String, required: true },
      username: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

export default mongoose.models.Provider || mongoose.model<IProvider>("Provider", ProviderSchema);
