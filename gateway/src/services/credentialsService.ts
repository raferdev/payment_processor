import Auth from "../repository/credentialsRepository.js";
import jwt from "jsonwebtoken";

async function Validate(token: Token, user: string) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const result = await Auth.findToken({ token });
  let userjwt: userjwt;
  jwt.verify(token, JWT_SECRET, (error, decoded: userjwt) => {
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

  if (result[0].user.user !== userjwt.id) {
    throw { type: "unauthorized", message: "Denied Acess!" };
  }
  return;
}

export const Token = {
  Validate,
};

type Token = string;
type userjwt = { id: string };
