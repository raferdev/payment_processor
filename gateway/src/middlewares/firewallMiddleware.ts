import { NextFunction, Request, Response } from "express";
import { PaymentType } from "../schemas/apiSchemas.js";
import { LogService } from "../services/firewallService.js";

async function FirewallMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user_id }: PaymentType = req.body;

  await LogService.Verify(user_id);

  next();
}

export default FirewallMiddleware;
