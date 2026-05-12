import express from "express";
import * as AuthController from "../controllers/authController.js";
import { requireFields } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  requireFields("name", "email", "password"),
  AuthController.register
);

router.post(
  "/login",
  requireFields("email", "password"),
  AuthController.login
);

export default router;
