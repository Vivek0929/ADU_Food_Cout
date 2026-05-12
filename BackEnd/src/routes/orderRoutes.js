import express from "express";
import * as OrderController from "../controllers/orderController.js";
import { protect, adminOnly, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// User: place an order (optionalAuth so guests can also order)
router.post("/", optionalAuth, OrderController.placeOrder);

// User: get their own orders
router.get("/my", protect, OrderController.getUserOrders);

// Admin: get all orders
router.get("/", protect, adminOnly, OrderController.getAllOrders);

// Admin: update order status
router.put("/:id/status", protect, adminOnly, OrderController.updateOrderStatus);

// Get specific order by id
router.get("/:id", protect, OrderController.getOrderById);

export default router;
