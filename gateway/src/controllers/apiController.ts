import { Request, Response } from "express";
import { PaymentType } from "../schemas/apiSchemas.js";

async function DispatchingController(req: Request, res: Response) {
  const payment: PaymentType = req.body;
}

export default DispatchingController;
