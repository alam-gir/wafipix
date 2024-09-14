import mongoose from "mongoose";
import { Image } from "./image.model";

export interface Social_Info extends mongoose.Document {
  title: string;
  icon: {
    url: string;
    public_id: string
  };
  url: string;
}

const Social_InfoSchema = new mongoose.Schema<Social_Info>(
  {
    title: { type: String, required: true },
    icon: 
      { 
        url: String,
        public_id: String
      },
    url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Social_InfoModel = mongoose.model<Social_Info>("Social_Info", Social_InfoSchema);
