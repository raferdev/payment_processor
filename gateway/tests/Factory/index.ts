import { validAccess } from "./validAccess.js";
import { redis } from "./redis.js";
import { request } from "./mainRoute.js";
const Factory = {
  validAccess,
  redis,
  request,
};

export default Factory;
