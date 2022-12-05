import cors from "cors";
import express from "express";
import "express-async-errors";
import healthCheck from "./controllers/heathCheck.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import apiRoute from "./routers/apiRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/health", healthCheck);
app.use("/", apiRoute);
app.use(errorHandlerMiddleware);

export default app;
