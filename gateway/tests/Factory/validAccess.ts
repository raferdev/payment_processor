import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function credentials() {
  const SALT = 10;
  const JWT_SECRET = process.env.JWT_SECRET;

  const newUser = {
    user: faker.random.numeric(5),
    password: bcrypt.hashSync(faker.internet.password(), SALT),
  };

  const token = jwt.sign({ id: newUser.user }, JWT_SECRET, {
    expiresIn: "12h",
  });

  const data = {
    newUser,
    token,
  };

  return data;
}

async function newToken(newUser: newUser) {
  const JWT_SECRET = "cloudwalksecret_test";

  const token = jwt.sign({ id: newUser.user }, JWT_SECRET, {
    expiresIn: "12h",
  });

  return token;
}

export const validAccess = {
  credentials,
  newToken,
};

type newUser = {
  user: string;
  password: string;
};
