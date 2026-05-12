import * as OrderModel from "../models/orderModel.js";

export const placeOrder = (order) => OrderModel.createOrder(order);
export const getAllOrders = () => OrderModel.getAllOrders();
export const getUserOrders = (userId) => OrderModel.getUserOrders(userId);
export const getOrderById = (id) => OrderModel.getOrderById(id);
export const updateOrderStatus = (id, status) => OrderModel.updateOrderStatus(id, status);
