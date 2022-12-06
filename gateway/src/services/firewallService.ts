import LogRepository from "../repository/firewallRepository.js";

async function Verify(user: Log) {
  const result = await LogRepository.setLog({ user });

  if (!result) {
    throw {
      type: "Too much requests",
      message: "Acess Denied!: Too much requests!",
    };
  }
  return;
}

export const LogService = {
  Verify,
};

type Log = number;
