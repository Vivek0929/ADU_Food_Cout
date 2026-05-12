import api from "./api.js";

export const getAllFoods = () => api.get("/food");

export const addFood = (food) => api.post("/food", food);

export const updateFood = (id, food) => api.put(`/food/${id}`, food);

export const deleteFood = (id) => api.delete(`/food/${id}`);
