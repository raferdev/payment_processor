import { faker } from "@faker-js/faker";

const INTERN_TOKEN = process.env.INTERN_TOKEN;
function data() {
  const acess: data = {
    user_id: Number(faker.random.numeric(5)),
    transaction_id: Number(faker.random.numeric(5)),
    merchant_id: Number(faker.random.numeric(5)),
    card_number: faker.random.numeric(12),
    transaction_date: faker.random.numeric(20),
    transaction_amount: Number(faker.random.numeric(5)),
    device_id: Number(faker.random.numeric(5)),
  };
  return acess;
}

function newToken() {
  const token = faker.datatype.uuid();
  return token;
}
function internToken() {
  return INTERN_TOKEN;
}

export const request = {
  data,
  newToken,
  internToken,
};

type data = {
  user_id?: number;
  transaction_id?: number;
  merchant_id?: number;
  card_number?: string;
  transaction_date?: string;
  transaction_amount?: number;
  device_id?: number;
};
