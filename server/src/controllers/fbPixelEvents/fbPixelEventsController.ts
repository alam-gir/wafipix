import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { ApiError } from "../../lib/custom-api-error-class";
import { fbPixelEventsService } from "../../services/fb-pixel-events-service";

export const fbPixelEventsController = {
  pageViewEventHit: asyncHandler(async (req: Request, res: Response) => {
    const { pageName, pageLink } = req.body as {
      pageName: string;
      pageLink: string;
    };

    if (!pageName || !pageLink)
      return res
        .status(400)
        .json({
          success: false,
          message: "pageName and pageLink are required",
        });

    const event = await fbPixelEventsService.pageViewEvent(
      pageName,
      pageLink,
      req
    );

    console.log({ event });

    return res.status(200).json({ success: true, event });
  }),
};
