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

const validAccess = {
  clean,
  add,
  addMany,
  updateToken,
};

export default validAccess;

type uniqueValidAccess = {
  token: string;
  user: string;
};
