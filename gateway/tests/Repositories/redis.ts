import client from "../../src/config/redis.js";

async function setLog({ user }: Log, lifetime: number) {
  return await client.set(user, "true", {
    EX: lifetime,
    NX: true,
  });
}

async function clean() {
  return await client.FLUSHALL();
}

async function read({ user }: Log) {
  return await client.get(user);
}

async function disconnect() {
  return await client.disconnect();
}

export const redis = {
  setLog,
  read,
  disconnect,
  clean,
};

type Log = { user: string };
