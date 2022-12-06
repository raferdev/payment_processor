import { Request, Response } from "express";
import { PaymentType } from "../schemas/apiSchemas.js";
import Dispathing from "../services/dispatchingService.js";

async function DispatchingController(req: Request, res: Response) {
  const payment: PaymentType = req.body;

  await Dispathing(payment);

  return res.status(200).send({
    type: "OK",
    transaction_id: payment.transaction_id,
    recommendation: "Aprove",
    status: 200,
  });
}

export default DispatchingController;
