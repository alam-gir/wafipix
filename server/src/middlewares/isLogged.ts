import { NextFunction, Response } from "express";
import { decodeJWT } from "../lib/decode-jwt-token";
import { ApiError } from "../lib/custom-api-error-class";
import { RequestWithUser } from "../../types/types";
import { UserModel } from "../models/user.model";

export const isLogged = async (
  req: RequestWithUser | any,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) throw new ApiError("token not found!", 404);
  const decode = decodeJWT(accessToken);

  try {
    const userSub = decode.userSub;

    const isExist = await UserModel.findOne({ sub: userSub }).exec();

    if (!isExist) throw new ApiError("Unauthenticated!", 401);

    req.user = { ...isExist.toObject() } as any;

    next();
  } catch (error) {
    next(error);
  }
};
