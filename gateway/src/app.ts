import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import apiRoute from "./routers/apiRouter.js";
import healthRouter from "./routers/healthRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.MODE === "TEST") {
  app.use("/health", healthRouter);
}
app.use("/", apiRoute);
app.use(errorHandlerMiddleware);

export default app;
