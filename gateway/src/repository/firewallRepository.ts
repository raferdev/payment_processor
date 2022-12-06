import client from "../config/redis.js";

async function setLog({ user }: Log) {
  const strUser = user.toString();
  return await client.set(strUser, "true", {
    EX: 5,
    NX: true,
  });
}

const LogRepository = {
  setLog,
};

export default LogRepository;

type Log = { user: number };
