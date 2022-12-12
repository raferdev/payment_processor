import prisma from "../../src/config/prisma.js";

async function clean() {
  return await prisma.validAccess.deleteMany();
}

async function add(validAcess: uniqueValidAccess) {
  return await prisma.validAccess.create({ data: validAcess });
}

async function addMany(manyValidAcess: uniqueValidAccess[]) {
  return await prisma.validAccess.createMany({ data: manyValidAcess });
}

async function find(user: string) {
  return await prisma.validAccess.findFirstOrThrow({
    where: {
      user,
    },
  });
}

async function updateToken(user: string, token: string) {
  return await prisma.validAccess.update({
    where: {
      user: user,
    },
    data: {
      token: token,
    },
  });
}

async function disconnect() {
  return await prisma.$disconnect();
}

export const validAccess = {
  find,
  clean,
  add,
  addMany,
  updateToken,
  disconnect,
};

type uniqueValidAccess = {
  token: string;
  user: string;
};
