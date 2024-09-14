import mongoose from "mongoose";
import { Image } from "./image.model";

export interface Contact_Info extends mongoose.Document {
  country: string;
  city: string;
  area: string;
  phone: string;
  email: string;
}

const Contact_InfoSchema = new mongoose.Schema<Contact_Info>(
  {
    country: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Contact_InfoModel = mongoose.model<Contact_Info>("Contact_Info", Contact_InfoSchema);
