import * as FoodModel from "../models/foodModel.js";

export const getAllFoods = () => FoodModel.getAllFoods();
export const getFoodById = (id) => FoodModel.getFoodById(id);
export const createFood = (food) => FoodModel.createFood(food);
export const updateFood = (id, food) => FoodModel.updateFood(id, food);
export const deleteFood = (id) => FoodModel.deleteFood(id);
