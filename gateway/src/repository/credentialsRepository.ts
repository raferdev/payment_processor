import prisma from "../config/prisma.js";

async function findToken({ token }: Token) {
  return await prisma.validAccess.findMany({
    where: {
      token,
    },
    select: {
      user: true,
      are_valid: true,
    },
  });
}

const Auth = {
  findToken,
};

export default Auth;

type Token = { token: string };
