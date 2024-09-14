import { PackageModel } from "../models/package.model";
import { ApiError } from "../lib/custom-api-error-class";
import { Service_Service } from "./service.service";

interface props {
  limit?: number;
  page?: number;
  sort?: "asc" | "desc";
  populate?: string;
  filter?: "all" | "active" | "inactive";
  q?: string;
}

export const Package_Service = {
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

      if (options?.q) {
        //set or in title and service title
        Aggregate[0].$match = { title: { $regex: options.q, $options: "i" } };
      }

      if (options?.page && options?.limit) {
        Aggregate.push({ $skip: skip });
      }

      if (options?.limit) {
        Aggregate.push({ $limit: options.limit });
      }

      const packages = await PackageModel.aggregate(Aggregate).exec();

      const count = await PackageModel.countDocuments(Aggregate[0].$match);

      const currentPage = options?.page || 1;
      const totalPages = Math.ceil(count / limit);
      const from = count === 0 ? 0 : skip + 1;
      const to = count === 0 ? 0 : count - skip > limit ? skip + limit : count;

      return {
        packages,
        paginate: { currentPage, totalPages, from, to, total: count },
      };
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const pkg = await PackageModel.findById(id).exec();

      if (!pkg) throw new ApiError("Package not found!", 404);

      return pkg;
    } catch (error) {
      throw error;
    }
  },

  getByService: async (serviceId: string) => {
    try {
      return await PackageModel.find({ service: serviceId }).exec();
    } catch (error) {
      throw error;
    }
  },

  create: async ({
    title,
    description,
    serviceId,
    features,
    price,
    is_active = true,
  }: {
    title: string;
    description?: string;
    serviceId: string;
    features: string[];
    price: {
      bdt: number;
      usd: number;
    };
    is_active: boolean;
  }) => {
    try {
      const pkg = new PackageModel({
        title,
        description,
        service: serviceId,
        features,
        price,
        is_active,
      });

      return await pkg.save();
    } catch (error) {
      throw error;
    }
  },

  updateTexts: async (
    packageId: string,
    {
      title,
      description,
      features,
      price,
    }: {
      title: string;
      description?: string;
      features: string[];
      price: {
        bdt: number;
        usd: number;
      };
    }
  ) => {
    try {
      const pkg = await PackageModel.findByIdAndUpdate(
        packageId,
        {
          title,
          description,
          features,
          price,
        },
        { new: true }
      ).exec();

      if (!pkg) throw new ApiError("Package not found!", 404);

      return pkg;
    } catch (error) {
      throw error;
    }
  },

  updatePrice: async (
    packageId: string,
    {
      bdt,
      usd,
    }: {
      bdt: number;
      usd: number;
    }
  ) => {
    try {
      const pkg = await PackageModel.findByIdAndUpdate(
        packageId,
        {
          price: {
            bdt,
            usd,
          },
        },
        { new: true }
      ).exec();

      if (!pkg) throw new ApiError("Package not found!", 404);

      return pkg;
    } catch (error) {
      throw error;
    }
  },

  updateService: async (
    packageId: string,
    {
      serviceId,
    }: {
      serviceId: string;
    }
  ) => {
    try {
      const service = await Service_Service.getById(serviceId);

      if (!service) throw new ApiError("Service not found!", 404);

      const pkg = await PackageModel.findByIdAndUpdate(
        packageId,
        {
          service: service._id,
        },
        { new: true }
      ).exec();

      if (!pkg) throw new ApiError("Package not found!", 404);

      return pkg;
    } catch (error) {
      throw error;
    }
  },

  updateActiveStatus: async (
    packageId: string,
    {
      is_active = true,
    }: {
      is_active: boolean;
    }
  ) => {
    try {
      const pkg = await PackageModel.findByIdAndUpdate(
        packageId,
        {
          is_active,
        },
        { new: true }
      ).exec();

      if (!pkg) throw new ApiError("Package not found!", 404);

      return pkg;
    } catch (error) {
      throw error;
    }
  },

  deleteById: async (id: string) => {
    try {
      return await PackageModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw error;
    }
  },
};
