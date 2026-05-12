import * as FoodService from "../services/foodService.js";

export const getAllFoods = async (req, res, next) => {
  try {
    const foods = await FoodService.getAllFoods();
    res.json(foods);
  } catch (err) { next(err); }
};

export const addFood = async (req, res, next) => {
  try {
    const food = await FoodService.createFood(req.body);
    res.status(201).json({ message: "Food added successfully", food });
  } catch (err) { next(err); }
};

export const updateFood = async (req, res, next) => {
  try {
    const food = await FoodService.updateFood(req.params.id, req.body);
    res.json({ message: "Food updated successfully", food });
  } catch (err) { next(err); }
};

export const deleteFood = async (req, res, next) => {
  try {
    await FoodService.deleteFood(req.params.id);
    res.json({ message: "Food deleted successfully" });
  } catch (err) { next(err); }
};
