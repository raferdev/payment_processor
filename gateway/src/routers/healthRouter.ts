import { Router } from "express";
import healthCheck from "../controllers/heathCheck.js";

const healthRouter = Router();

healthRouter.post("/", healthCheck.Check);
healthRouter.post("/mlservice", healthCheck.Mlservice);
healthRouter.post("/rulesservice", healthCheck.Rulesservice);
export default healthRouter;
