import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { Top_Customer_Service } from "../../services/top-customer.service";

export const topCustomerController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const topCustomers = await Top_Customer_Service.getAll();
    res.status(200).json(topCustomers);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) throw new Error("Id is required");

    const topCustomer = await Top_Customer_Service.getById(id);

    res.status(200).json({ success: true, topCustomer });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.body;
    const logo = req.file as Express.Multer.File;

    if (!title) throw new Error("Title is required");

    if (!logo) throw new Error("Logo is required");

    const createdTopCustomer = await Top_Customer_Service.create({
      title,
      logo,
    });

    res.status(201).json({ success: true, topCustomer: createdTopCustomer });
  }),

  updateTexts: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!id) throw new Error("Id is required");

    if (!title) throw new Error("Title is required");

    const updatedTopCustomer = await Top_Customer_Service.updateTexts(id, {
      title,
    });

    res.status(200).json({ success: true, topCustomer: updatedTopCustomer });
  }),

  updateLogo: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const logo = req.file as Express.Multer.File;

    if (!id) throw new Error("Id is required");

    if (!logo) throw new Error("Logo is required");

    const updatedTopCustomer = await Top_Customer_Service.updateLogo(id, {
      logo,
    });

    res.status(200).json({ success: true, topCustomer: updatedTopCustomer });
  }),

  deleteById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) throw new Error("Id is required");

    const deletedTopCustomer = await Top_Customer_Service.deleteById(id);

    res.status(200).json({ success: true, topCustomer: deletedTopCustomer });
  }),
};
