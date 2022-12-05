import { NextFunction, Request, Response } from "express";
import { paymentShema, PaymentType } from "../schemas/apiSchemas.js";

function PaymentSchemaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const payment: PaymentType = req.body;

  const validate = paymentShema.validate(payment);

  if (validate.error) {
    throw { type: "schema_validation", message: "Request Error!" };
  }

  next();
}

export default PaymentSchemaMiddleware;
