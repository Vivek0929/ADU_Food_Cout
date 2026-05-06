import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("MySQL API running ✅");
});


// 🔹 GET all food
app.get("/api/food", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM foods");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});


// 🔹 ADD food
app.post("/api/food", async (req, res) => {
  const { name, price, category, image } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO foods (name, price, category, image) VALUES (?, ?, ?, ?)",
      [name, price, category, image]
    );

    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
});


// 🔹 DELETE food
app.delete("/api/food/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM foods WHERE id = ?", [req.params.id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});