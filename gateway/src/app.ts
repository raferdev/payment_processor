import cors from "cors";
import express from "express";
import "express-async-errors";
import _env from "./config/env.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import apiRoute from "./routers/apiRouter.js";
import healthRouter from "./routers/healthRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

if (_env.MODE === "TEST") {
  app.use("/health", healthRouter);
}
app.use("/", apiRoute);
app.use(errorHandlerMiddleware);

export default app;
