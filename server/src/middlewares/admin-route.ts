import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../types/types";
import { asyncHandler } from "./async-handler";
import { UserModel } from "../models/user.model";
import { ApiError } from "../lib/custom-api-error-class";
import { decodeJWT } from "../lib/decode-jwt-token";

export const adminRoute = asyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      
      if (!accessToken) throw new ApiError("token not found!", 404);
      
      const decode = decodeJWT(accessToken);

      const userSub = decode.sub;

      const isExist = await UserModel.findOne({ sub: userSub }).exec();

      if (!isExist) throw new ApiError("Unauthenticated!", 401);

      const isAdmin = isExist.role === "ADMIN"
      
      if (!isAdmin) throw new ApiError(`Unauthorized`, 403);

      req.user = { ...isExist.toObject(), role: "ADMIN" } as any;

      next();
    } catch (error) {
      next(error);
    }
  }
);
