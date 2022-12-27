import prisma from "./prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _env from "./env.js";
import { User } from "@prisma/client";
import __shell from "./constShell.js";

async function addOrUpdate() {
  let find: User[];

  find = await prisma.user.findMany({ where: { user: _env.ADMIN } });

  async function addAdmin() {
    const admin = {
      user: _env.ADMIN,
      password: bcrypt.hashSync(_env.PASSWORD, _env.SALT_ROUNDS),
    };

    const result = await prisma.user.create({ data: admin });

    const dbtoken = jwt.sign({ id: result.id }, _env.JWT_SECRET, {
      expiresIn: "12h",
    });
    const user = await prisma.validAccess.create({
      data: { user_id: result.id, token: dbtoken, are_valid: true },
    });
    __shell.terminal("green", "", "dim", false, "AQUI");
    __shell.terminal("cyan", "", "", true, `ACESS TOKEN = ${user.token}`);
    return;
  }

  if (find[0]) {
    const dbtoken = jwt.sign({ id: find[0].id }, _env.JWT_SECRET, {
      expiresIn: "12h",
    });

    const user = await prisma.validAccess.update({
      where: { user_id: find[0].id },
      data: {
        token: dbtoken,
      },
    });

    __shell.terminal("white", "bgGreen", "bright", false, "HERE");

    __shell.terminal("cyan", "", "bright", true, `ACESS TOKEN = ${user.token}`);
    return;
  }

  await addAdmin();
}

async function seed() {
  await addOrUpdate();
}

seed()
  .catch((e) => {
    throw new Error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
