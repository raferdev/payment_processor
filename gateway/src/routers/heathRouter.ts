import { Router } from "express";
import healthCheck from "../controllers/heathCheck.js";

const healthRouter = Router();

healthRouter.get("/", healthCheck);

export default healthRouter;
