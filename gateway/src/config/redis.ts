import { createClient } from "redis";
import _env from "./env.js";

const client = createClient({
  url: _env.REDIS_URL,
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

export default client;
