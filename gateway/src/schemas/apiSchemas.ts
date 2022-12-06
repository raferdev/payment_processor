import Joi from "joi";

export const paymentShema = Joi.object<PaymentType>({
  user_id: Joi.number().required(),
  transaction_id: Joi.number().required(),
  merchant_id: Joi.number().required(),
  card_number: Joi.string().required(),
  transaction_date: Joi.string().required(),
  transaction_amount: Joi.number().required(),
  device_id: Joi.number().required(),
});

export interface PaymentType {
  user_id: number;
  transaction_id: number;
  merchant_id: number;
  card_number: number;
  transaction_date: string;
  transaction_amount: number;
  device_id: number;
}
