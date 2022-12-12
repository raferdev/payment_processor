import prisma from "../src/config/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const ENVSALT = process.env.SALT_ROUNDS;
const SALT = ENVSALT ? +ENVSALT : 10;
const JWT_SECRET = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : "cloudwalksecret";

export const newUser = {
  user: faker.random.numeric(5),
  password: bcrypt.hashSync(faker.internet.password(), SALT),
};

async function credentials() {
  const result = await prisma.user.create({ data: newUser });

  const token = jwt.sign({ id: newUser.user }, JWT_SECRET, {
    expiresIn: "12h",
  });

  await prisma.validAccess.createMany({
    data: [{ user_id: result.id, token: token, are_valid: true }],
  });
}

async function admin() {
  const admin = {
    user: "00000",
    password: bcrypt.hashSync("password", SALT),
  };

  const result = await prisma.user.create({ data: admin });

  const token = jwt.sign({ id: "00000" }, JWT_SECRET, { expiresIn: "12h" });

  console.log(`ACESS TOKEN:${token}`);

  await prisma.validAccess.createMany({
    data: [{ user_id: result.id, token: token, are_valid: true }],
  });
}

async function seed() {
  await admin();
  await credentials();
}

seed()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
