import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import pool, { dbState } from '../config/db.js';

const FOODS_FILE = fileURLToPath(new URL('../foods_store.json', import.meta.url));

export const ensureFoodsFile = async () => {
  try {
    await fs.access(FOODS_FILE);
  } catch (e) {
    await fs.writeFile(FOODS_FILE, JSON.stringify([]));
  }
};

const readFoodsFromFile = async () => {
  try {
    const txt = await fs.readFile(FOODS_FILE, 'utf-8');
    return JSON.parse(txt || '[]');
  } catch (e) {
    return [];
  }
};

const writeFoodsToFile = async (foods) => {
  await fs.writeFile(FOODS_FILE, JSON.stringify(foods, null, 2));
};

// GET ALL FOODS
export const getAllFoods = async (req, res) => {
  try {
    if (dbState.dbAvailable) {
      const [rows] = await pool.query("SELECT * FROM foods");
      return res.json(rows);
    } else {
      const foods = await readFoodsFromFile();
      return res.json(foods);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch foods" });
  }
};

// ADD FOOD
export const addFood = async (req, res) => {
  const { name, description, price, image, prepTime, category, isVegetarian, isAvailable } = req.body;
  try {
    if (dbState.dbAvailable) {
      const [result] = await pool.query(
        "INSERT INTO foods (name, description, price, image, prepTime, category, isVegetarian, isAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [name, description, price, image, prepTime, category, isVegetarian, isAvailable]
      );
      return res.json({ message: "Food Added Successfully", id: result.insertId });
    } else {
      const foods = await readFoodsFromFile();
      const newFood = {
        id: Date.now(),
        name, description, price, image, prepTime, category, isVegetarian, isAvailable
      };
      foods.push(newFood);
      await writeFoodsToFile(foods);
      return res.json({ message: "Food Added Successfully", id: newFood.id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add food" });
  }
};

// UPDATE FOOD
export const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, prepTime, category, isVegetarian, isAvailable } = req.body;
  try {
    if (dbState.dbAvailable) {
      await pool.query(
        "UPDATE foods SET name=?, description=?, price=?, image=?, prepTime=?, category=?, isVegetarian=?, isAvailable=? WHERE id=?",
        [name, description, price, image, prepTime, category, isVegetarian, isAvailable, id]
      );
      return res.json({ message: "Food Updated Successfully" });
    } else {
      const foods = await readFoodsFromFile();
      const index = foods.findIndex(f => f.id == id);
      if (index !== -1) {
        foods[index] = { ...foods[index], name, description, price, image, prepTime, category, isVegetarian, isAvailable };
        await writeFoodsToFile(foods);
      }
      return res.json({ message: "Food Updated Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update food" });
  }
};

// DELETE FOOD
export const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    if (dbState.dbAvailable) {
      await pool.query("DELETE FROM foods WHERE id = ?", [id]);
      return res.json({ message: "Food Deleted Successfully" });
    } else {
      const foods = await readFoodsFromFile();
      const newFoods = foods.filter(f => f.id != id);
      await writeFoodsToFile(newFoods);
      return res.json({ message: "Food Deleted Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete food" });
  }
};
