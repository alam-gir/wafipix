import { Router } from "express";
import { serviceController } from "../controllers/service/service.controller";
import { adminRoute } from "../middlewares/admin-route";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router
  .get("/services", serviceController.getAll)
  .get("/services/findbyslug/:slug", serviceController.getBySlug)
  .get("/services/:id", serviceController.getById)
  .post(
    "/services",
     adminRoute,
    upload.fields([{name: "icon", maxCount: 1}, {name: "image", maxCount: 1}]),
    serviceController.create
  )

  .patch(
    "/services/:id/update/texts",
     adminRoute,
    serviceController.updateTexts
  )
  .patch(
    "/services/:id/update/image",
    upload.single("image"),
     adminRoute,
    serviceController.updateImage
  )
  .patch(
    "/services/:id/update/icon",
    upload.single("icon"),
     adminRoute,
    serviceController.updateIcon
  )
  .patch(
    "/services/:id/update/active-status",
    // adminRoute,
    serviceController.updateActiveStatus
  )
  .delete("/services/:id", 
    // adminRoute,
     serviceController.delete);

export default router;
