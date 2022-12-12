import prisma from "../src/config/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import "dotenv/config";

async function credentials() {
  const ENVSALT = process.env.SALT_ROUNDS;
  const SALT = ENVSALT ? +ENVSALT : 10;
  const JWT_SECRET = process.env.JWT_SECRET
    ? process.env.JWT_SECRET
    : "cloudwalksecret";
  const newUser = {
    user: Number(faker.random.numeric(5)),
    password: bcrypt.hashSync(faker.internet.password(), SALT),
  };
  const result = await prisma.user.create({ data: newUser });

  const token = jwt.sign({ id: newUser }, JWT_SECRET, { expiresIn: "12h" });

  await prisma.validAccess.createMany({
    data: [{ user_id: result.id, token: token, are_valid: true }],
  });
}

async function seed() {
  await credentials();
}

seed()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
