import mongoose from "mongoose";
import { Image } from "./image.model";

export interface Service extends mongoose.Document {
  title: string;
  tags: string[];
  description: string;
  slug: string;
  icon: Image | mongoose.Types.ObjectId;
  image: Image | mongoose.Types.ObjectId;
  is_active: boolean;
}

export interface ServicePopulated extends Service {
  icon: Image;
  image: Image;
}

const ServiceSchema = new mongoose.Schema<Service>(
  {
    title: { type: String, required: true },
    tags: [String],
    description: String,
    slug: { type: String, required: true },
    icon: 
      { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    image: 
      { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const ServiceModel = mongoose.model<Service>("Service", ServiceSchema);
