import Auth from "../repository/credentialsRepository.js";

async function Validate(token: Token) {
  const result = await Auth.findToken({ token });

  if (!result) {
    throw { type: "authentication", message: "Denied Acess!" };
  }

  return;
}

export const Token = {
  Validate,
};

type Token = string;
