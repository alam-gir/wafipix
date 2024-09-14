import { io } from "..";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../lib/cloudinary";
import { bgWorker } from "../lib/utils";
import { ImageModel } from "../models/image.model";

export const Image_Service = {
  getById: async (id: string) => {
    return await ImageModel.findById(id).exec();
  },

  updateById: async (id: string, File: Express.Multer.File, folder: string) => {
    const imagePromise = ImageModel.findById(id).exec();
    const uploadImagePromise = uploadFileToCloudinary({
      file: File,
      folder,
    });

    const [image, uploadedImage] = await Promise.all([
      imagePromise,
      uploadImagePromise,
    ]);

    if (!image && uploadedImage) {
      await deleteFileFromCloudinary(uploadedImage?.public_id);
      return null;
    }
    if (uploadedImage) {
      const oldImage = image;

      const updatedImage = await ImageModel.findByIdAndUpdate(
        id,
        {
          fileName: File.filename,
          originalName: File.originalname,
          size: File.size,
          content_type: File.mimetype,
          secure_url: uploadedImage.secure_url,
          public_id: uploadedImage.public_id,
          format: uploadedImage.format,
          hieght: uploadedImage.height,
          widht: uploadedImage.width,
        },
        { new: true }
      ).exec();

      if (!updatedImage) {
        await deleteFileFromCloudinary(uploadedImage?.public_id);
        return null;
      }
      if (updatedImage && oldImage?.public_id) {
        bgWorker(async () => {
          await deleteFileFromCloudinary(oldImage?.public_id as string);
        }, 200);
      }
      return updatedImage;
    }
  },

  add: async (image: Express.Multer.File, folder: string) => {
    const uploadedImage = await uploadFileToCloudinary({ file: image, folder });

    if (uploadedImage) {
      const newImage = new ImageModel({
        fileName: image.filename,
        originalName: image.originalname,
        size: image.size,
        content_type: image.mimetype,
        secure_url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
        format: uploadedImage.format,
        hieght: uploadedImage.height,
        widht: uploadedImage.width,
      });
      await newImage.save();

      return newImage;
    }

    return null;
  },

  deleteById: async (id: string) => {
    const image = await ImageModel.findById(id).exec();
    if (image) {
      const deleteFromCloudinaryPromise = deleteFileFromCloudinary(
        image.public_id
      );
      const deleteFromDBPromise = ImageModel.findByIdAndDelete(id).exec();
      const [deleteFromCloud, deleteFromDb] = await Promise.all([
        deleteFromCloudinaryPromise,
        deleteFromDBPromise,
      ]);
      return deleteFromDb;
    }
  },
};
