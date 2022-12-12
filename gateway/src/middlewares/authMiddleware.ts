import { NextFunction, Request, Response } from "express";
import { Token } from "../services/credentialsService.js";

async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const { token }: Token = req.params;

  if (!token) {
    throw { type: "unauthorized", message: "Denied Acess!" };
  }

  await Token.Validate(token);

  next();
}

type Token = { token?: string };

export default AuthMiddleware;
