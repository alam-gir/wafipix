import { Router } from "express"
import { fbPixelEventsController } from "../controllers/fbPixelEvents/fbPixelEventsController";


const router = Router();

router.post("/fb-pixel-events/page-view", fbPixelEventsController.pageViewEventHit);

export default router;