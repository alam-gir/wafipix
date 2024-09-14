import { Router } from "express";
import { heroFeatureController } from "../controllers/hero-feature/hero-feature.controller";
import { adminRoute } from "../middlewares/admin-route";

const router = Router()

router
.route("/hero-features")
    .get(heroFeatureController.get)
    .post(
        adminRoute,
        heroFeatureController.create)
    .put(
        adminRoute,
        heroFeatureController.create)
export default router;