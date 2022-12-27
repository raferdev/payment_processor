import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Repositories from "../Repositories/index.js";

const SALT = +process.env.SALT_ROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;
const INTERN_TOKEN = process.env.INTERN_TOKEN;

async function NewCredential() {
  const newUser = {
    user: faker.random.numeric(5),
    password: bcrypt.hashSync(faker.internet.password(), SALT),
  };
  const result = await Repositories.validAccess.addUser(newUser);
  const token = jwt.sign({ id: result.id }, JWT_SECRET, {
    expiresIn: "12h",
  });

  const data = {
    internToken: INTERN_TOKEN,
    newUser,
    token,
    id: result.id,
  };

  return data;
}

async function NewUser() {
  const user = {
    user: faker.random.numeric(5),
    password: bcrypt.hashSync(faker.internet.password(), SALT),
  };

  return user;
}

async function NewToken(newData: newData) {
  const token = jwt.sign({ id: newData.id }, JWT_SECRET, {
    expiresIn: "12h",
  });

  return token;
}

export const validAccess = {
  NewCredential,
  NewToken,
  NewUser,
};

type newUser = {
  user: string;
  password: string;
};

type newData = {
  newUser: newUser;
  token: string;
  id: number;
};
