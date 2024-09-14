import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { Social_Info_Service } from "../../services/social-info.service";

export const socialInfoController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const socials = await Social_Info_Service.getAll();

    res.status(200).json(socials);
  }),
  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const social = await Social_Info_Service.getById(id);

    res.status(200).json(social);
  }),

  getByTitle: asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.params;
    const social = await Social_Info_Service.getByTitle(title);

    res.status(200).json(social);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { title, url } = req.body;
    const icon = req.file as Express.Multer.File;

    const social = await Social_Info_Service.create({ title, icon, url });
    res.status(201).json({ success: true, socialInfo: social });
  }),

  updateTexts: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, url } = req.body;

    const social = await Social_Info_Service.updateTexts(id, { title, url });

    res.status(200).json(social);
  }),

  upadateIcon: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const icon = req.file as Express.Multer.File;

    const social = await Social_Info_Service.updateIcon(id, { icon });

    res.status(200).json(social);
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const deleted = await Social_Info_Service.deleteById(id);

    res
      .status(200)
      .json({ success: deleted, message: "Social info deleted successfully" });
  }),
};
