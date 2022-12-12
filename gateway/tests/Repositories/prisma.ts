import prisma from "../../src/config/prisma.js";

async function clean() {
  await prisma.validAccess.deleteMany();
  await prisma.user.deleteMany();

  return;
}

async function add(validAccess: uniqueValidAccess) {
  const result = await prisma.user.create({ data: validAccess.newUser });

  return await prisma.validAccess.create({
    data: { user_id: result.id, token: validAccess.token, are_valid: true },
  });
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
  add,
  updateToken,
  disconnect,
};

type uniqueValidAccess = {
  token: string;
  newUser: {
    user: string;
    password: string;
  };
};
