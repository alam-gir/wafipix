import { Router } from "express";
import { adminRoute } from "../middlewares/admin-route";
import { packageController } from "../controllers/package/package-controller";


const router = Router();

router
    .get("/packages", packageController.getAll)
    .get("/packages/:id", packageController.getById)
    .get("/packages/findbyserviceid/:serviceId", packageController.getByServiceId)
    .post("/packages", 
    adminRoute,
    packageController.create)
    .patch("/packages/:id/update/texts",
    adminRoute,
     packageController.updateTexts)
    .patch("/packages/:id/update/service",
    adminRoute,
     packageController.updateService)
    .patch("/packages/:id/update/price",
    adminRoute,
     packageController.updatePrice)
    .patch("/packages/:id/update/active-status",
    adminRoute,
     packageController.updateActiveStatus)
    .delete("/packages/:id",
    adminRoute,
     packageController.delete);
export default router;