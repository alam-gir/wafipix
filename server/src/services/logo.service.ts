import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../lib/cloudinary";
import { ApiError } from "../lib/custom-api-error-class";
import { LogoModel } from "../models/logo.model";

export const Logo_Service = {
  get: async () => {
    try {
      const logo = await LogoModel.find();
      return logo[0] ? logo[0] : null;
    } catch (error) {
      throw error;
    }
  },
  create: async (logo: Express.Multer.File) => {
    try {
      const uploadedLogo = await uploadFileToCloudinary({
        file: logo,
        folder: process.env.CLOUDINARY_LOGO_FOLDER!,
      });

      if (!uploadedLogo)
        throw new ApiError("Error uploading logo to cloudinary", 400);

      const oldLogos = await LogoModel.find();

      let updatedLogo;

      if (oldLogos[0]) {

        updatedLogo = await LogoModel.findByIdAndUpdate(oldLogos[0]._id, {
          url: uploadedLogo.secure_url,
          public_id: uploadedLogo.public_id,
        });

        await deleteFileFromCloudinary(oldLogos[0].public_id);
      } else {

        updatedLogo = await LogoModel.create({
          url: uploadedLogo.secure_url,
          public_id: uploadedLogo.public_id,
        });

      }

      if (!updatedLogo) {
        await deleteFileFromCloudinary(uploadedLogo.public_id);
        throw new ApiError("Error creating logo", 400);
      } else {
        return updatedLogo;
      }
    } catch (error) {
      throw error;
    }
  },
 
};
