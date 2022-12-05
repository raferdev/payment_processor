import { Router } from "express";
import { apiController } from "../controllers/apiController.js";

const apiRouter = Router();

apiRouter.post("/", apiController.insert);

export default apiRouter;
