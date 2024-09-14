import { Router } from "express";
import { topCustomerController } from "../controllers/top-customer/top-customer.controller";
import { adminRoute } from "../middlewares/admin-route";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router
  .get("/top-customers", topCustomerController.getAll)
  .get("/top-customers/:id", topCustomerController.getById)
  .post(
    "/top-customers",
    upload.single("logo"),
    adminRoute,
    topCustomerController.create
  )
  .put(
    "/top-customers/:id/update/texts",
    upload.single("logo"),
    adminRoute,
    topCustomerController.updateTexts
  )
  .put(
    "/top-customers/:id/update/logo",
    upload.single("logo"),
    adminRoute,
    topCustomerController.updateLogo
  )

  .delete("/top-customers/:id", adminRoute, topCustomerController.deleteById);

export default router;
