import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { ApiError } from "../../lib/custom-api-error-class";
import { Service_Service } from "../../services/service.service";

export const serviceController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const { limit, page, filter, sort, populate, q } = req.query as {
      limit: string;
      page: string;
      populate: string;
      filter: "all" | "active" | "inactive";
      sort: "asc" | "desc";
      q: string;
    };
    const services = await Service_Service.getAll({
      limit: parseInt(limit),
      page: parseInt(page),
      populate,
      filter,
      sort,
      q,
    });

    return res.status(200).json(services);
  }),

  getBySlug: asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;

    const service = await Service_Service.getBySlug(slug);

    return res.status(200).json(service);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const service = await Service_Service.getById(id);

    return res.status(200).json(service);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { title, tags, description } = req.body as {
      title: string;
      tags: string[];
      description: string;
    };

    const { icon, image } = req.files as unknown as {
      icon: Express.Multer.File[];
      image: Express.Multer.File[];
    };

    let iconSingle = icon?.length > 0 ? icon[0] : undefined;
    let imageSingle = image?.length > 0 ? image[0] : undefined;

    if (!imageSingle) throw new ApiError("Image is Required.", 404);

    if (!iconSingle) throw new ApiError("Icon is Required.", 404);

    if (!title) throw new ApiError("Title is Required.", 404);

    const service = await Service_Service.create({
      title,
      tags : tags || [],
      icon: iconSingle,
      image: imageSingle,
      description,
    });

    res.status(201).json({ success: true, service });
  }),

  updateTexts: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const { title, tags, description } = req.body as {
      title: string;
      tags: string[];
      description: string;
    };

    if (!id) throw new ApiError("Id is Required.", 404);
    if (!title) throw new ApiError("Title is Required.", 404);
    if (!description) throw new ApiError("Description is Required.", 404);

    const service = await Service_Service.updateTexts(id, {
      title,
      tags: tags || [],
      description,
    });

    res.status(200).json({ success: true, service });
  }),

  updateImage: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new ApiError("Id is Required.", 404);

    const image = req.file as Express.Multer.File;

    const serviceImage = await Service_Service.updateImage(id, { image });

    res.status(200).json({ success: true, serviceImage });
  }),

  updateIcon: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new ApiError("Id is Required.", 404);

    const icon = req.file as Express.Multer.File;

    const serviceIcon = await Service_Service.updateIcon(id, { icon });

    res.status(200).json({ success: true, serviceIcon });
  }),

  updateActiveStatus: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new ApiError("Id is Required.", 404);

    const { is_active } = req.body as {
      is_active: boolean;
    };

    const service = await Service_Service.updateActiveStatus(id, { is_active });

    res.status(200).json({ success: true, service });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) throw new ApiError("Id is Required.", 404);

    const service = await Service_Service.deleteById(id);

    res.status(200).json({ success: true, service });
  }),
};
