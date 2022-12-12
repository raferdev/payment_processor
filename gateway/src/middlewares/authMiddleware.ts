import { NextFunction, Request, Response } from "express";
import { Token } from "../services/credentialsService.js";

async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const { token }: Token = req.params;
  let { authorization }: { authorization?: string } = req.headers;

  if (!authorization) {
    throw { type: "unauthorized", message: "Denied Acess!" };
  }

  if (!token) {
    throw { type: "unauthorized", message: "Denied Acess!" };
  }

  await Token.Validate(token, authorization);

  next();
}

type Token = { token?: string };

export default AuthMiddleware;
