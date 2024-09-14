import { Request, Response } from "express";
import { Logo_Service } from "../../services/logo.service";
import { ApiError } from "../../lib/custom-api-error-class";
import { asyncHandler } from "../../middlewares/async-handler";

export const logoController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    try {
      const logo = await Logo_Service.get();

      if (!logo) throw new ApiError("No logo found", 404);

      res.status(200).json(logo);
    } catch (error) {
      throw error;
    }
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    try {
      const logoFile = req.file as Express.Multer.File;

      const logo = await Logo_Service.create(logoFile);

      res.status(201).json(logo);
    } catch (error) {
      throw error;
    }
  }),
};
