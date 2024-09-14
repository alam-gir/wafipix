import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { ApiError } from "../../lib/custom-api-error-class";
import { Portfolio_Service } from "../../services/portfolio.service";

export const portfolioController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { limit, page, sort, populate, q } = req.query as {
      limit: string;
      page: string;
      populate: string;
      sort: "asc" | "desc";
      q: string;
    };

    const portfolios = await Portfolio_Service.getAll({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: sort as any,
      populate,
      q,
    });

    return res.status(200).json(portfolios);
  }),

  getBySlug: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const portfolio = await Portfolio_Service.getBySlug(slug);

    return res.status(200).json(portfolio);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const portfolio = await Portfolio_Service.getById(id);

    return res.status(200).json(portfolio);
  }),

  getByServiceId: asyncHandler(async (req: Request, res: Response) => {
    const { serviceId } = req.params;

    const { limit, page, sort, populate, q } = req.query as {
      limit: string;
      page: string;
      populate: string;
      sort: "asc" | "desc";
      q: string;
    };
    
    if (!serviceId) throw new ApiError("Service Id is Required.", 404);

    const portfolios = await Portfolio_Service.getByServiceId(serviceId, {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: sort as any,
      populate,
      q,
    });

    res.status(200).json(portfolios);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { title, tags, serviceId } = req.body as {
      title: string;
      tags: string[];
      serviceId: string;
    };

    const image = req.file as unknown as Express.Multer.File;

    if (!title) throw new ApiError("Title is Required.", 404);
    if (!serviceId) throw new ApiError("Service Id is Required.", 404);

    const portfolio = await Portfolio_Service.create({
      title,
      tags,
      image,
      serviceId,
    });

    res.status(201).json({ success: true, portfolio });
  }),

  updateTexts: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new ApiError("Id is Required.", 404);

    const { title, tags } = req.body as {
      title: string;
      tags: string[];
    };

    const portfolio = await Portfolio_Service.updateTexts(id, {
      title,
      tags: tags || [],
    });

    res.status(200).json({ success: true, portfolio });
  }),

  updateImage: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new ApiError("Id is Required.", 404);

    const image = req.file as Express.Multer.File;

    const portfolioImage = await Portfolio_Service.updateImage(id, { image });

    res.status(200).json({ success: true, portfolioImage });
  }),

  updateService: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new ApiError("Id is Required.", 404);

    const { serviceId } = req.body as {
      serviceId: string;
    };

    const portfolio = await Portfolio_Service.updateService(id, { serviceId });

    res.status(200).json({ success: true, portfolio });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new ApiError("Id is Required.", 404);

    const portfolio = await Portfolio_Service.deleteById(id);

    res.status(200).json({ success: true, portfolio });
  }),
};
