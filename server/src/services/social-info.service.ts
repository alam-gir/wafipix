import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../lib/cloudinary";
import { ApiError } from "../lib/custom-api-error-class";
import { Social_InfoModel } from "../models/social-info.model";

export const Social_Info_Service = {
  getAll: async () => {
    try {
      return await Social_InfoModel.find();
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const social = await Social_InfoModel.findById(id);

      if (!social) throw new ApiError("Not found", 404);

      return social;
    } catch (error) {
      throw error;
    }
  },

  getByTitle: async (title: string) => {
    try {
      const social = await Social_InfoModel.findOne({ title });

      if (!social) throw new ApiError("Not found", 404);

      return social;
    } catch (error) {
      throw error;
    }
  },

  create: async ({
    title,
    icon,
    url,
  }: {
    title: string;
    icon: Express.Multer.File;
    url: string;
  }) => {
    try {
      if (!title) throw new ApiError("Title must required!", 404);
      if (!icon) throw new ApiError("Icon must required!", 404);
      if (!url) throw new ApiError("Url must required!", 404);

      const uploadedIcon = await uploadFileToCloudinary({
        file: icon,
        folder: process.env.CLOUDINARY_SOCIAL_INFO_ICON_FOLDER!,
      });

      if (!uploadedIcon) throw new ApiError("Failed to upload icon!", 400);

      return await Social_InfoModel.create({
        title,
        icon: {
          url: uploadedIcon.secure_url,
          public_id: uploadedIcon.public_id,
        },
        url,
      });
    } catch (error) {
      throw error;
    }
  },

  updateTexts: async (
    id: string,
    { title, url }: { title: string; url: string }
  ) => {
    try {
      if (!id) throw new ApiError("Id is required!", 404);
      if (!title) throw new ApiError("Title is required!", 404);
      if (!url) throw new ApiError("URL is required!", 404);

      const social = await Social_InfoModel.findById(id);
      if (!social) throw new ApiError("Not found!", 404);

      social.title = title;
      social.url = url;

      return await social.save();
    } catch (error) {
      throw error;
    }
  },

  updateIcon: async (id: string, { icon }: { icon: Express.Multer.File }) => {
    try {
      if (!id) throw new ApiError("Id Not Found", 404);

      const social = await Social_InfoModel.findById(id);
      if (!social) throw new ApiError("Not found!", 404);

      const oldIconPublicId = social.icon.public_id;

      const uploadedIcon = await uploadFileToCloudinary({
        file: icon,
        folder: process.env.CLOUDINARY_SOCIAL_INFO_ICON_FOLDER!,
      });

      if (!uploadedIcon) throw new ApiError("Failed to upload icon!", 400);

      social.icon.url = uploadedIcon.secure_url;
      social.icon.public_id = uploadedIcon.public_id;

      const updatedSocial = await social.save();

      if (!updatedSocial) {
        await deleteFileFromCloudinary(uploadedIcon.public_id);
        throw new ApiError("Failed to update!", 400);
      }

      await deleteFileFromCloudinary(oldIconPublicId);

      return updatedSocial;
    } catch (error) {
      throw error;
    }
  },

  deleteById: async (id: string) => {
    try {
      if (!id) throw new ApiError("Id Not Found!", 404);

      const social = await Social_InfoModel.findById(id);

      if (!social) throw new ApiError("Not found!", 404);
      
      const deleted = await Social_InfoModel.findByIdAndDelete(id);

      if (!deleted) throw new ApiError("Failed to delete!", 400);

      await deleteFileFromCloudinary(social.icon.public_id);

      return true;
    } catch (error) {
      throw error;
    }
  },
};
