import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { ApiError } from "../../lib/custom-api-error-class";
import { Package_Service } from "../../services/package.service";

export const packageController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { limit, page, filter, sort, populate, q } = req.query as {
      limit: string;
      page: string;
      populate: string;
      filter: "all" | "active" | "inactive";
      sort: "asc" | "desc";
      q: string;
    };
    const packages = await Package_Service.getAll({
      limit: parseInt(limit),
      page: parseInt(page),
      populate,
      filter,
      sort,
      q,
    });

    return res.status(200).json(packages);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const pkg = await Package_Service.getById(id);

    return res.status(200).json(pkg);
  }),

  getByServiceId: asyncHandler(async (req: Request, res: Response) => {
    const { serviceId } = req.params;

    if (!serviceId) throw new ApiError("Service Id is Required.", 404);

    const packages = await Package_Service.getByService(serviceId);

    return res.status(200).json(packages);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { title, description, serviceId, features, price, is_active } =
      req.body as {
        title: string;
        description?: string;
        serviceId: string;
        features: string[];
        price: {
          bdt: number;
          usd: number;
        };
        is_active: boolean;
      };

    if (!title) throw new ApiError("Title is Required.", 404);
    if (!serviceId) throw new ApiError("Service Id is Required.", 404);
    if (!price || price.bdt < 0 || price.usd < 0)
      throw new ApiError("Price can't be negative.", 404);

    const pkg = await Package_Service.create({
      title,
      description,
      serviceId,
      features,
      price,
      is_active: is_active,
    });

    res.status(201).json({ success: true, package: pkg });
  }),

  updateTexts: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, features, price } = req.body as {
      title: string;
      description?: string;
      features: string[];
      price: {
        bdt: number;
        usd: number;
      };
    };

    if (!id) throw new ApiError("Id is Required.", 404);

    if (!title) throw new ApiError("Title is Required.", 404);
    if(!price || price.bdt < 0 || price.usd < 0) throw new ApiError("Price can't be negative.", 404);

    const pkg = await Package_Service.updateTexts(id, {
      title,
      description,
      features,
      price
    });

    res.status(200).json({ success: true, package: pkg });
  }),

  updatePrice: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { bdt, usd } = req.body as {
      bdt: number;
      usd: number;
    };

    if (!id) throw new ApiError("Id is Required.", 404);

    if (!bdt || !usd || bdt < 0 || usd < 0)
      throw new ApiError("Price can't be negative.", 404);

    const pkg = await Package_Service.updatePrice(id, { bdt, usd });

    res.status(200).json({ success: true, package: pkg });
  }),

  updateService: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { serviceId } = req.body as {
      serviceId: string;
    };

    if (!id) throw new ApiError("Id is Required.", 404);
    if (!serviceId) throw new ApiError("Service Id is Required.", 404);

    const pkg = await Package_Service.updateService(id, { serviceId });

    res.status(200).json({ success: true, package: pkg });
  }),

  updateActiveStatus: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { is_active } = req.body as {
      is_active: boolean;
    };

    if (!id) throw new ApiError("Id is Required.", 404);

    const pkg = await Package_Service.updateActiveStatus(id, { is_active });

    res.status(200).json({ success: true, package: pkg });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new ApiError("Id is Required.", 404);

    const pkg = await Package_Service.deleteById(id);

    res.status(200).json({ success: true, package: pkg });
  }),
};
