import mongoose from "mongoose";
import { Service } from "./service.model";

export interface Package extends mongoose.Document {
  title: string;
  description: string;
  service: mongoose.Types.ObjectId | Service;
  features: string[];
  price: {
    bdt: number
    usd: number
  }
  is_active: boolean;
}

export interface PackagePopulated extends Package {
  service: Service;
}

const PackageSchema = new mongoose.Schema<Package>(
  {
    title: { type: String, required: true },
    description: String,
    service: 
      { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    features: [{ type: String }],
    price: 
      {
        bdt: { type: Number, required: true },
        usd: { type: Number, required: true },
      },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const PackageModel = mongoose.model<Package>("Package", PackageSchema);
