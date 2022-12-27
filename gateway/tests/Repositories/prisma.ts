import prisma from "../../src/config/prisma.js";

async function clean() {
  await prisma.validAccess.deleteMany();
  await prisma.user.deleteMany();

  return;
}

async function addUser(validAccess: uniqueValidAccess) {
  const result = await prisma.user.create({ data: validAccess });
  return result;
}

async function addToken(data: tokenValidAcces) {
  const result = await prisma.validAccess.create({ data });
  return result;
}

async function find(user: string) {
  return await prisma.user.findFirstOrThrow({
    where: {
      user,
    },
  });
}

async function updateToken(lastToken: string, token: string) {
  return await prisma.validAccess.update({
    where: {
      token: lastToken,
    },
    data: {
      token,
    },
  });
}

async function disconnect() {
  return await prisma.$disconnect();
}

export const validAccess = {
  find,
  clean,
  addUser,
  updateToken,
  addToken,
  disconnect,
};

type uniqueValidAccess = {
  user: string;
  password: string;
};
type tokenValidAcces = {
  token: string;
  user_id: number;
  are_valid: boolean;
};
