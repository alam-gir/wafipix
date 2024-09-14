import mongoose from "mongoose";
import { Image } from "./image.model";

export interface Top_Customer extends mongoose.Document {
  title: string;
  logo_url: Image | mongoose.Types.ObjectId;
  public_id: string;

}

const Top_CustomerSchema = new mongoose.Schema<Top_Customer>(
  {
    title: { type: String, required: true },
    logo_url: { type: Object, required: true },
    public_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Top_CustomerModel = mongoose.model<Top_Customer>("Top_Customer", Top_CustomerSchema);
