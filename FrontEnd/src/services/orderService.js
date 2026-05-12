import api from "./api.js";

export const placeOrder = (orderData) => api.post("/orders", orderData);

export const getUserOrders = () => api.get("/orders/my");

export const getAllOrders = () => api.get("/orders");

export const getOrderById = (id) => api.get(`/orders/${id}`);

export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}/status`, { status });
