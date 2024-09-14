import mongoose, { Mongoose, Schema, SchemaType } from "mongoose";
import { ApiError } from "../lib/custom-api-error-class";
import { getSlug } from "../lib/utils";
import { PortfolioModel } from "../models/portfolio.model";
import { Image_Service } from "./image.service";
import { Service_Service } from "./service.service";

interface props {
  limit?: number;
  page?: number;
  sort?: "asc" | "desc";
  populate?: string;
  filter?: "all" | "active" | "inactive";
  q?: string;
}

export const Portfolio_Service = {
  getAll: async (options?: props) => {
    try {
      const skip = options?.page
        ? (options.page - 1) * (options.limit || 10)
        : 0;
      const limit = options?.limit || 10;

      // return await PortfolioModel.find().skip(skip).limit(limit).populate("image").exec();

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

      if (options?.populate?.includes("service")) {
        Aggregate.push({
          $lookup: {
            from: "services",
            localField: "service",
            foreignField: "_id",
            as: "service",
          },
        });

        Aggregate.push({ $unwind: "$service" });
      }

      if (options?.page && options?.limit) {
        Aggregate.push({ $skip: skip });
      }

      if (options?.limit) {
        Aggregate.push({ $limit: options.limit });
      }

      const portfolios = await PortfolioModel.aggregate(Aggregate);
      const count = await PortfolioModel.countDocuments(Aggregate[0].$match);

      const currentPage = options?.page || 1;
      const totalPages = Math.ceil(count / limit);
      const from = count === 0 ? 0 : skip + 1;
      const to = count === 0 ? 0 : count - skip > limit ? skip + limit : count;

      return {
        portfolios,
        paginate: { currentPage, totalPages, from, to, total: count },
      };
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const portfolio = await PortfolioModel.findById(id)
        .populate("image")
        .exec();

      if (!portfolio) throw new Error("Portfolio not found!");

      return portfolio;
    } catch (error) {
      throw error;
    }
  },

  getBySlug: async (slug: string) => {
    try {
      const portfolio = await PortfolioModel.findOne({ slug })
        .populate("image")
        .exec();

      if (!portfolio) throw new Error("Portfolio not found!");

      return portfolio;
    } catch (error) {
      throw error;
    }
  },

  getByServiceIdOut: async (serviceId: string, options?: { limit: number }) => {
    try {
      const portfolio = await PortfolioModel.find({ service: serviceId })
        .limit(options?.limit!)
        .populate("image")
        .exec();

      return portfolio;
    } catch (error) {
      throw error;
    }
  },

  getByServiceId: async (serviceId : string,options?: props) => {
    
    try {
      const skip = options?.page
        ? (options.page - 1) * (options.limit || 10)
        : 0;
      const limit = options?.limit || 10;

      const Aggregate: any[] = [
        {
          $match: {
            service: new mongoose.Types.ObjectId(serviceId)
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ];

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

      if (options?.populate?.includes("service")) {
        Aggregate.push({
          $lookup: {
            from: "services",
            localField: "service",
            foreignField: "_id",
            as: "service",
          },
        });

        Aggregate.push({ $unwind: "$service" });
      }

      if (options?.page && options?.limit) {
        Aggregate.push({ $skip: skip });
      }

      if (options?.limit) {
        Aggregate.push({ $limit: options.limit });
      }

      const portfolios = await PortfolioModel.aggregate(Aggregate);
      const count = await PortfolioModel.countDocuments(Aggregate[0].$match);

      const currentPage = options?.page || 1;
      const totalPages = Math.ceil(count / limit);
      const from = count === 0 ? 0 : skip + 1;
      const to = count === 0 ? 0 : count - skip > limit ? skip + limit : count;

      return {
        portfolios,
        paginate: { currentPage, totalPages, from, to, total: count },
      };
    } catch (error) {
      throw error;
    }
  },

  create: async ({
    title,
    tags,
    image,
    serviceId,
  }: {
    title: string;
    tags: string[];
    image: Express.Multer.File;
    serviceId: string;
  }) => {
    try {
      const service = await Service_Service.getById(serviceId);

      if (!service) throw new ApiError("Service not found!", 404);

      if (!title) throw new ApiError("Title is required!", 404);
      if (!image) throw new ApiError("Image is required!", 404);

      const slug = getSlug(title);

      const imageD = await Image_Service.add(image, "portfolio");

      const portfolio = new PortfolioModel({
        title,
        tags,
        slug,
        image: imageD?._id,
        service: service._id,
      });

      return await portfolio.save();
    } catch (error) {
      throw error;
    }
  },

  updateTexts: async (
    id: string,
    { title, tags }: { title: string; tags: string[] }
  ) => {
    try {
      const portfolio = await PortfolioModel.findById(id).exec();

      if (!portfolio) throw new ApiError("Portfolio not found!", 404);

      if (title && title !== portfolio.title) {
        const newSlug = getSlug(title);
        portfolio.slug = newSlug;
        portfolio.title = title;
      }

      portfolio.tags = tags;

      return await portfolio.save();
    } catch (error) {
      throw error;
    }
  },

  updateImage: async (
    id: string,
    { image }: { image: Express.Multer.File }
  ) => {
    try {
      const portfolio = await PortfolioModel.findById(id).exec();

      if (!portfolio) throw new ApiError("Portfolio not found!", 404);

      if (!portfolio?.image) {
        const newImage = await Image_Service.add(
          image,
          process.env.CLOUDINARY_PORTFOLIO_IMAGE_FOLDER as string
        );
        portfolio.image = newImage?._id as any;
        const updatedPortfolio = (await portfolio.save()).populate("image");
        return (await updatedPortfolio).image;
      }

      const updatedImage = await Image_Service.updateById(
        portfolio?.image as any,
        image,
        process.env.CLOUDINARY_PORTFOLIO_IMAGE_FOLDER as string
      );

      if (!updatedImage) throw new ApiError("Image not updated!", 500);

      return updatedImage;
    } catch (error) {
      throw error;
    }
  },

  updateService: async (id: string, { serviceId }: { serviceId: string }) => {
    try {
      const service = await Service_Service.getById(serviceId);

      if (!service) throw new Error("Service not found!");

      const portfolio = await PortfolioModel.findByIdAndUpdate(
        id,
        { service: service._id },
        { new: true }
      );

      if (!portfolio) throw new Error("Portfolio not found!");

      return portfolio;
    } catch (error) {
      throw error;
    }
  },

  deleteById: async (id: string) => {
    try {
      // Delete the image from cloudinary NOTE>>>>>
      const portfolio = await PortfolioModel.findById(id).exec();

      if (!portfolio) throw new ApiError("Portfolio not found!", 404);

      if (portfolio?.image) {
        const imageDeletePromise = await Image_Service.deleteById(
          portfolio.image as any
        );
        const portfolioDeletePromise = await PortfolioModel.findByIdAndDelete(
          id
        ).exec();
        await Promise.all([imageDeletePromise, portfolioDeletePromise]);
      } else {
        await PortfolioModel.findByIdAndDelete(id).exec();
      }

      return true;
    } catch (error) {
      throw error;
    }
  },
};
