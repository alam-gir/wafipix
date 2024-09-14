import { Router } from "express";
import { logoController } from "../controllers/logo/logo-controller";
import { adminRoute } from "../middlewares/admin-route";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router
  .get("/logo", logoController.get)
  .post("/logo", upload.single("logo"), adminRoute, logoController.create)
  .put("/logo", upload.single("logo"), adminRoute, logoController.create);

export default router;
