import mongoose from "mongoose";
import { Service } from "./service.model";
import { Image } from "./image.model";

export interface Portfolio extends mongoose.Document {
  title: string;
  tags: string[];
  slug: string;
  service: mongoose.Types.ObjectId | Service;
  image: mongoose.Types.ObjectId | Image;
}

export interface PortfolioPopulated extends Portfolio {
  image: Image;
  service: Service;
}

const PortfolioSchema = new mongoose.Schema<Portfolio>(
  {
    title: { type: String, required: true, unique: true },
    tags: [String],
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    slug: { type: String, required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  },
  {
    timestamps: true,
  }
);

export const PortfolioModel = mongoose.model<Portfolio>(
  "Portfolio",
  PortfolioSchema
);
