import Auth from "../repository/credentialsRepository.js";

async function Validate(token: Token) {
  const result = await Auth.findToken({ token });
  if (!result[0]) {
    throw { type: "unauthorized", message: "Denied Acess!" };
  }

  return;
}

export const Token = {
  Validate,
};

type Token = string;
