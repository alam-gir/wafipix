import mongoose from "mongoose";
import { Image } from "./image.model";

export interface Logo extends mongoose.Document {
  url: string
  public_id: string
}

const LogoSchema = new mongoose.Schema<Logo>(
  { 
      url: {type: String, required: true},
      public_id: {type: String, required: true}
  },
  {
    timestamps: true,
  }
);

export const LogoModel = mongoose.model<Logo>("Logo", LogoSchema);
