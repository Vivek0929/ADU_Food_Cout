import express from "express";
import * as FoodController from "../controllers/foodController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { requireFields, requirePositiveNumber } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/", FoodController.getAllFoods);
router.post(
  "/",
  protect, adminOnly,
  requireFields("name", "price", "category"),
  requirePositiveNumber("price"),
  FoodController.addFood
);
router.put(
  "/:id",
  protect, adminOnly,
  requireFields("name", "price", "category"),
  FoodController.updateFood
);
router.delete("/:id", protect, adminOnly, FoodController.deleteFood);

export default router;
