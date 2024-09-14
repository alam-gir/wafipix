import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { Contact_Info_Service } from "../../services/contact-info.service";

export const contactInfoController = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const contactInfo = await Contact_Info_Service.get();
    res.status(200).json(contactInfo);
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { country, city, area, phone, email } = req.body;

    const contactInfo = await Contact_Info_Service.create({
      country,
      city,
      area,
      phone,
      email,
    });

    res.status(201).json({ success: true, contactInfo });
  }),
};
