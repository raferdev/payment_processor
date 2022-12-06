import LogRepository from "../repository/firewallRepository.js";

async function Verify(user: Log) {
  const result = await LogRepository.setLog({ user });
  console.log(result);
  if (!result) {
    throw { type: "Too mutch requests", message: "Denied Acess!" };
  }
  return;
}

export const LogService = {
  Verify,
};

type Log = number;
