import { validAccess } from "./prisma.js";
import { redis } from "./redis.js";

const Repositories = {
  validAccess,
  redis,
};

export default Repositories;
