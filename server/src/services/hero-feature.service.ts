
  import { ApiError } from "../lib/custom-api-error-class";
import { Hero_FeaturesModel } from "../models/hero-features.model";
  
  export const Hero_Feature_Service = {
    get: async () => {
      try {
        const features = await Hero_FeaturesModel.find();
        return features.length > 0 ? features[0].features : null;
    } catch (error) {
        throw error;
      }
    },
  
    create: async (
      features: string[]
     ) => {
      try {
        if(!features || features.length === 0) throw new ApiError("Features must required!", 404);

        const featureDoc = await Hero_FeaturesModel.find()

        if(featureDoc.length === 0) {
            const f = await Hero_FeaturesModel.create({features});
            return f.features;
        }else{
            const featureId = featureDoc[0]._id;
            const f = await Hero_FeaturesModel.findByIdAndUpdate(featureId, {features}, {new: true});
            return f?.features;
        }

    } catch (error) {
        throw error;
      }
    },

  };
  