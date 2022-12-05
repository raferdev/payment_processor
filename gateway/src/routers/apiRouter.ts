import { Router } from "express";
import DispatchingController from "../controllers/apiController.js";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import PaymentSchemaMiddleware from "../middlewares/schemaMiddleware.js";

const apiRouter = Router();

apiRouter.post(
  "/:token",
  AuthMiddleware,
  PaymentSchemaMiddleware,
  DispatchingController
);

export default apiRouter;
