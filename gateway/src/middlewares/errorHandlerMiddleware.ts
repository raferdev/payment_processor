import { NextFunction, Request, Response } from "express";
import _env from "../config/env.js";
import {
  AppError,
  errorTypeToStatusCode,
  isAppError,
} from "../utils/errorUtils.js";

export function errorHandlerMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (_env.MODE === "TEST" && err.type === "test") {
    return res.status(err.status).json(err.message);
  }
  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err);
  }

  return res.sendStatus(500);
}
