import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { Hero_Feature_Service } from "../../services/hero-feature.service";

export const heroFeatureController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const features = await Hero_Feature_Service.get();
    res.status(200).json(features);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { features } = req.body as { features: string[] };

    const featuresDoc = await Hero_Feature_Service.create(features);

    res.status(201).json({ success: true, features: featuresDoc });
  }),
};
