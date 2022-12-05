import { NextFunction, Request, Response } from "express";
import Auth from "../repository/credentials.js";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { token }: Token = req.params;
  if (!token) {
    throw { type: "authentication", message: "Denied Acess!" };
  }
  const result = await Auth.findToken({ token });

  if (!result) {
    throw { type: "authentication", message: "Denied Acess!" };
  }
  next();
}

type Token = { token?: string };

export default authMiddleware;
