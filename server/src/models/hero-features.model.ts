import mongoose from "mongoose";

export interface Hero_Features extends mongoose.Document {
  features: string[];
}



const Hero_FeaturesSchema = new mongoose.Schema<Hero_Features>(
  {
    features: [String],
  },
  {
    timestamps: true,
  }
);

export const Hero_FeaturesModel = mongoose.model<Hero_Features>("Hero_Feature", Hero_FeaturesSchema);
