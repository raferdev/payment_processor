import { Router } from "express";
import DispatchingController from "../controllers/apiController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import FirewallMiddleware from "../middlewares/firewallMiddleware.js";
import PaymentSchemaMiddleware from "../middlewares/schemaMiddleware.js";

const apiRouter = Router();

apiRouter.post(
  "/:token",
  AuthMiddleware,
  PaymentSchemaMiddleware,
  FirewallMiddleware,
  DispatchingController
);

export default apiRouter;
