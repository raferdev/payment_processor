import { Router } from "express";
import healthCheck from "../controllers/heathCheck.js";

const healthRouter = Router();

healthRouter.post("/", healthCheck.Check);
healthRouter.post("/health");

export default healthRouter;
