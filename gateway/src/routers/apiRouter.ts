import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const apiRouter = Router();

apiRouter.post("/", authMiddleware);

export default apiRouter;
