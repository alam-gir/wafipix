import { Router } from "express";
import { socialInfoController } from "../controllers/social-info/social-info.controller";
import { upload } from "../middlewares/multer.middleware";
import { adminRoute } from "../middlewares/admin-route";

const router = Router()


router
    .get("/social-info", socialInfoController.getAll)
    .post("/social-info",
        upload.single("icon"),
        adminRoute,
        socialInfoController.create)
    .get("/social-info/:id", socialInfoController.getById)
    .get("/social-info/findbytitle/:title", socialInfoController.getByTitle)
    .put("/social-info/:id/update/texts",
        adminRoute,
        socialInfoController.updateTexts)
    .put("/social-info/:id/update/icon",
        upload.single("icon"),
        adminRoute,
        socialInfoController.upadateIcon)
    .delete("/social-info/:id",
        adminRoute,
        socialInfoController.delete
    )

export default router;