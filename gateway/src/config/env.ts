import "dotenv/config";

const PORT = +process.env.PORTGAT;
const ML_SERVER = process.env.ML_SERVER;
const RULES_SERVER = process.env.RULES_SERVER;
const MODE = process.env.MODE;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIS_URL = process.env.REDIS_URL;
const DATABASE_URL = process.env.DATABASE_URL;
const INTERN_TOKEN = process.env.INTERN_TOKEN;
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const ADMIN = process.env.ADMIN;
const PASSWORD = process.env.PASSWORD;

const _env = {
  PORT,
  ML_SERVER,
  RULES_SERVER,
  MODE,
  REDIS_URL,
  JWT_SECRET,
  DATABASE_URL,
  INTERN_TOKEN,
  SALT_ROUNDS,
  ADMIN,
  PASSWORD,
};

export default _env;
