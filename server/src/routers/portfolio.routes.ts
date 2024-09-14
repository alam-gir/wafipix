import express from "express";
import { portfolioController } from "../controllers/portfolio/portfolio.controller";
import { adminRoute } from "../middlewares/admin-route";
import { upload } from "../middlewares/multer.middleware";

const router = express.Router();

router
  .get("/portfolios", portfolioController.getAll)
  .post(
    "/portfolios",
    upload.single("image"),
    adminRoute,
    portfolioController.create
  )
  .get("/portfolios/:id", portfolioController.getById)
  .get("/portfolios/findbyslug/:slug", portfolioController.getBySlug)
  .get(
    "/portfolios/findbyserviceid/:serviceId",
    portfolioController.getByServiceId
  )
  .patch(
    "/portfolios/:id/update/texts",
    adminRoute,
    portfolioController.updateTexts
  )
  .patch(
    "/portfolios/:id/update/image",
    upload.single("image"),
    adminRoute,
    portfolioController.updateImage
  )
  .patch(
    "/portfolios/:id/update/service",
    adminRoute,
    portfolioController.updateService
  )
  .delete("/portfolios/:id", adminRoute, portfolioController.delete);

export default router;
