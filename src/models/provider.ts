import mongoose, { Schema, Document } from "mongoose";

export interface IProvider extends Document {
  name: string;
  categories: string[]; // Updated to array of strings
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
    code_number?: string; // Made optional
    identifier_code?: string; // Made optional
  };
  user_info: {
    user_id: string;
    username: string;
    email: string;
    password: string; // Added password field
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProviderSchema = new Schema<IProvider>(
  {
    name: { type: String, required: true },
    categories: { type: [String], required: true, alias: "category" }, // Updated to array of strings
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
      code_number: { type: String, required: false, default: "" }, // ✅ Default empty string
      identifier_code: { type: String, required: false, default: "" }// Made optional
    },
    user_info: {
      user_id: { type: String, required: true },
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true }, // Added password field
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Pre-save hook to set username to the same value as name
ProviderSchema.pre('save', function (next) {
  this.user_info.username = this.name;
  next();
});

export default mongoose.models.Provider || mongoose.model<IProvider>("Provider", ProviderSchema);