import pool from "../config/db.js";

export const getAllFoods = async () => {
  const [rows] = await pool.query("SELECT * FROM foods");
  return rows;
};

export const getFoodById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM foods WHERE id = ?", [id]);
  return rows[0];
};

export const createFood = async (food) => {
  const { name, description, price, image, prepTime, category, isVegetarian, isAvailable } = food;
  const [result] = await pool.query(
    "INSERT INTO foods (name, description, price, image, prepTime, category, isVegetarian, isAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [name, description, price, image, prepTime, category, isVegetarian ? 1 : 0, isAvailable ? 1 : 0]
  );
  return { id: result.insertId, ...food };
};

export const updateFood = async (id, food) => {
  const { name, description, price, image, prepTime, category, isVegetarian, isAvailable } = food;
  await pool.query(
    "UPDATE foods SET name=?, description=?, price=?, image=?, prepTime=?, category=?, isVegetarian=?, isAvailable=? WHERE id=?",
    [name, description, price, image, prepTime, category, isVegetarian ? 1 : 0, isAvailable ? 1 : 0, id]
  );
  return { id, ...food };
};

export const deleteFood = async (id) => {
  await pool.query("DELETE FROM foods WHERE id = ?", [id]);
  return { id };
};
