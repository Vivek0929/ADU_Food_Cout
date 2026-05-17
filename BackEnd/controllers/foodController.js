import pool from '../config/db.js';

// GET ALL FOODS
export const getAllFoods = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM foods");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// ADD FOOD
export const addFood = async (req, res) => {
  const { name, description, price, image, prepTime, category, isVegetarian, isAvailable } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO foods (name, description, price, image, prepTime, category, isVegetarian, isAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, description, price, image, prepTime, category, isVegetarian, isAvailable]
    );
    res.json({ message: "Food Added Successfully", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// UPDATE FOOD
export const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, prepTime, category, isVegetarian, isAvailable } = req.body;
  try {
    await pool.query(
      "UPDATE foods SET name=?, description=?, price=?, image=?, prepTime=?, category=?, isVegetarian=?, isAvailable=? WHERE id=?",
      [name, description, price, image, prepTime, category, isVegetarian, isAvailable, id]
    );
    res.json({ message: "Food Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// DELETE FOOD
export const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM foods WHERE id = ?", [id]);
    res.json({ message: "Food Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
