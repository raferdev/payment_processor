import Auth from "../repository/credentialsRepository.js";
import jwt from "jsonwebtoken";
import _env from "../config/env.js";

async function Validate(token: Token, user: string) {
  const result = await Auth.findToken({ token });

  let userjwt: userjwt;

  jwt.verify(token, _env.JWT_SECRET, (error, decoded: userjwt) => {
    if (error) {
      throw { type: "token_error", message: "Invalid or expired token!" };
    }

    return (userjwt = decoded);
  });

  if (!result[0]) {
    throw { type: "unauthorized", message: "Denied Acess!" };
  }

  if (!result[0].are_valid) {
    throw { type: "unauthorized", message: "Denied Acess!" };
  }

  if (result[0].user.id !== userjwt.id) {
    throw { type: "unauthorized", message: "Denied Acess!" };
  }
  return;
}

export const Token = {
  Validate,
};

type Token = string;
type userjwt = { id: number };
