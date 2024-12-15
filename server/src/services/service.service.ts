import { ApiError } from "../lib/custom-api-error-class";
import { ServiceModel } from "../models/service.model";
import { getSlug } from "../lib/utils";
import { Image_Service } from "./image.service";
import { Portfolio_Service } from "./portfolio.service";
import { Package_Service } from "./package.service";

interface props {
  limit?: number;
  page?: number;
  sort?: "asc" | "desc";
  populate?: string;
  filter?: "all" | "active" | "inactive";
  q?: string;
}

export const Service_Service = {
  getAll: async (options?: props) => {
    try {
      const skip = options?.page
        ? (options.page - 1) * (options.limit || 10)
        : 0;
      const limit = options?.limit || 10;

      const Aggregate: any[] = [
        {
          $match: {},
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ];

      if (options?.filter) {
        if (options?.filter === "active") {
          Aggregate[0].$match.is_active = true;
        } else if (options?.filter === "inactive") {
          Aggregate[0].$match.is_active = false;
        }
      }

      if (options?.sort) {
        if (options.sort === "asc") {
          Aggregate[1].$sort = { createdAt: 1 };
        } else {
          Aggregate[1].$sort = { createdAt: -1 };
        }
      }

      if (options?.q) {
        const queryWords = options.q
          .toLowerCase()
          .split(" ")
          .map((w) => w.trim())
          .filter(Boolean);

        Aggregate[0].$match.$or = [
          { title: { $regex: options.q, $options: "i" } },
          {
            $or: queryWords?.map((word) => ({
              tags: { $regex: word, $options: "i" },
            })),
          },
        ];
      }

      if (options?.populate?.includes("image")) {
        Aggregate.push({
          $lookup: {
            from: "images",
            localField: "image",
            foreignField: "_id",
            as: "image",
          },
        });

        Aggregate.push({ $unwind: "$image" });
      }

      if (options?.populate?.includes("icon")) {
        Aggregate.push({
          $lookup: {
            from: "images",
            localField: "icon",
            foreignField: "_id",
            as: "icon",
          },
        });

        Aggregate.push({ $unwind: "$icon" });
      }

      if (options?.page && options?.limit) {
        Aggregate.push({ $skip: skip });
      }

      if (options?.limit) {
        Aggregate.push({ $limit: options.limit });
      }

      const services = await ServiceModel.aggregate(Aggregate).exec();

      const count = await ServiceModel.countDocuments(Aggregate[0].$match);

      const currentPage = options?.page || 1;
      const totalPages = Math.ceil(count / limit);
      const from = count === 0 ? 0 : skip + 1;
      const to = count === 0 ? 0 : count - skip > limit ? skip + limit : count;

      return {
        services,
        paginate: { currentPage, totalPages, from, to, total: count },
      };
    } catch (error) {
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const service = await ServiceModel.findOne({ slug }).populate("image icon").exec();

      if (!service) throw new ApiError("Service not found!", 404);

      return service;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const service = await ServiceModel.findById(id).populate("image icon").exec();

      if (!service) throw new ApiError("Service not found!", 404);

      return service;
    } catch (error) {
      throw error;
    }
  },

  create: async ({
    title,
    tags,
    description,
    icon,
    image,
    is_active = true,
  }: {
    title: string;
    tags: string[];
    description?: string;
    icon: Express.Multer.File;
    image: Express.Multer.File;
    is_active?: boolean;
  }) => {
    try {
      const slug = getSlug(title);

      const imageDPromise = Image_Service.add(
        image,
        process.env.CLOUDINARY_SERVICE_IMAGE_FOLDER as string
      );

      const iconDPromise = Image_Service.add(
        icon,
        process.env.CLOUDINARY_SERVICE_ICON_FOLDER as string
      );

      const [imageD, iconD] = await Promise.all([imageDPromise, iconDPromise]);

      if (!imageD) {
        if (iconD) await Image_Service.deleteById(iconD?.public_id);
        throw new ApiError("Image not uploaded!", 500);
      }

      if (!iconD) {
        if (imageD) await Image_Service.deleteById(imageD?.public_id);
        throw new ApiError("Icon not uploaded!", 500);
      }

      const service = await ServiceModel.create({
        title,
        slug,
        description,
        is_active,
        tags,
        image: imageD._id,
        icon: iconD._id,
      });

      return service;
    } catch (error) {
      throw error;
    }
  },

  updateTexts: async (
    serviceId: string,
    {
      title,
      tags,
      description,
    }: { title?: string; tags: string[]; description?: string }
  ) => {
    try {
      const service = await ServiceModel.findById(serviceId).exec();

      if (!service) throw new ApiError("Service not found!", 404);

      if (title) {
        if (service.title !== title) {
          const newSlug = getSlug(title);
          service.title = title;
          service.slug = newSlug;
        }
      }
      if (description) service.description = description;

      if (tags.length) service.tags = tags;
      else service.tags = [];

      return await service.save();
    } catch (error) {
      throw error;
    }
  },

  updateActiveStatus: async (
    serviceId: string,
    { is_active }: { is_active: boolean }
  ) => {
    try {
      const service = await ServiceModel.findByIdAndUpdate(
        serviceId,
        { is_active: is_active },
        { new: true }
      ).exec();

      if (!service) throw new ApiError("Service not found!", 404);

      return service;
    } catch (error) {
      throw error;
    }
  },

  updateImage: async (
    id: string,
    { image }: { image: Express.Multer.File }
  ) => {
    try {
      const service = await ServiceModel.findById(id).exec();

      if (!service) throw new ApiError("Service not found!", 404);

      if (!service?.image) {
        const newImage = await Image_Service.add(
          image,
          process.env.CLOUDINARY_SERVICE_IMAGE_FOLDER as string
        );
        service.image = newImage?._id as any;
        return await service.save();
      }

      const updatedImage = await Image_Service.updateById(
        service?.image as any,
        image,
        process.env.CLOUDINARY_SERVICE_IMAGE_FOLDER as string
      );

      if (!updatedImage) throw new ApiError("Image not updated!", 500);

      return updatedImage;
    } catch (error) {
      throw error;
    }
  },

  updateIcon: async (id: string, { icon }: { icon: Express.Multer.File }) => {
    try {
      const service = await ServiceModel.findById(id).exec();

      if (!service) throw new ApiError("Service not found!", 404);

      if (!service?.icon) {
        const newIcon = await Image_Service.add(
          icon,
          process.env.CLOUDINARY_SERVICE_ICON_FOLDER as string
        );
        service.icon = newIcon?._id as any;
        return await service.save();
      }

      const updatedIcon = await Image_Service.updateById(
        service?.icon as any,
        icon,
        process.env.CLOUDINARY_SERVICE_ICON_FOLDER as string
      );

      if (!updatedIcon) throw new ApiError("Icon not updated!", 500);

      return updatedIcon;
    } catch (error) {
      throw error;
    }
  },

  deleteById: async (id: string) => {
    try {
      const service = await ServiceModel.findById(id).exec();

      if (!service) throw new ApiError("Service not found!", 404);

      const portfolios = await Portfolio_Service.getByServiceId(
        service._id as any
      );

      const packages = await Package_Service.getByService(service._id as any);

      if (portfolios.portfolios.length > 0) {
        throw new ApiError("Service have portfolios!", 400);
      } else if (packages.length > 0) {
        throw new ApiError("Service have packages!", 400);
      }

      if (service?.image) {
        await Image_Service.deleteById(service.image as any);
      }

      if (service?.icon) {
        await Image_Service.deleteById(service.icon as any);
      }

      return await ServiceModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw error;
    }
  },
};
