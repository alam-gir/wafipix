import { Router } from "express";
import { adminRoute } from "../middlewares/admin-route";
import { contactInfoController } from "../controllers/contact-info/contact-info.controller";

const router = Router()

router
.route("/contact-info")
    .get(contactInfoController.get)
    .post(
        adminRoute,
        contactInfoController.create)
    .put(
        adminRoute,
        contactInfoController.create)
export default router;