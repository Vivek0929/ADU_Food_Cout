import express from "express";
import * as UserController from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, UserController.getProfile);
router.put("/profile", protect, UserController.updateProfile);

export default router;
