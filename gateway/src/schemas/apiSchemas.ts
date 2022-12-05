import Joi from "joi";

export const paymentShema = Joi.object<PaymentType>({
  transaction_id: Joi.string().required(),
  merchant_id: Joi.string().uri().required(),
  card_number: Joi.string().required(),
  transaction_date: Joi.string().required(),
  transaction_amount: Joi.string().required(),
  device_id: Joi.number().required(),
});

export interface PaymentType {
  transaction_id: number;
  merchant_id: number;
  card_number: number;
  transaction_date: string;
  transaction_amount: number;
  device_id: number;
}
