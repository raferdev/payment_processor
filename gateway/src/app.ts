import cors from "cors";
import express from "express";
import "express-async-errors";
import heathCheck from "./controllers/heathCheck.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import apiRoute from "./routers/apiRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/:token/health", heathCheck);
app.use("/:token/api/", apiRoute);
app.use(errorHandlerMiddleware);

export default app;
