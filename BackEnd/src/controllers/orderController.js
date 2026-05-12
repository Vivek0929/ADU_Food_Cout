import * as OrderService from "../services/orderService.js";

export const placeOrder = async (req, res, next) => {
  try {
    const userId = req.user?.id || null;
    const order = await OrderService.placeOrder({ ...req.body, userId });
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) { next(err); }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  } catch (err) { next(err); }
};

export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getUserOrders(req.user.id);
    res.json(orders);
  } catch (err) { next(err); }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) { next(err); }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);
    res.json({ message: "Order status updated", order });
  } catch (err) { next(err); }
};
