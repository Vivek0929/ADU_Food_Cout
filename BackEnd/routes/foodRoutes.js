import express from 'express';
import { getAllFoods, addFood, updateFood, deleteFood } from '../controllers/foodController.js';

const router = express.Router();

router.get('/', getAllFoods);
router.post('/', addFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

export default router;
