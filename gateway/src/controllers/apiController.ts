import { Request, Response } from "express";
import { PaymentType } from "../schemas/apiSchemas.js";
import Dispathing from "../services/dispatchingService.js";

async function DispatchingController(req: Request, res: Response) {
  const payment: PaymentType = req.body;

  await Dispathing(payment);

  return res.sendStatus(200);
}

export default DispatchingController;
