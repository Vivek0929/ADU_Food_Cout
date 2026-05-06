import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server running ✅");
});


// GET ALL FOODS
app.get("/api/food", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM foods");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


// ADD FOOD
app.post("/api/food", async (req, res) => {
  const {
    name,
    description,
    price,
    image,
    prepTime,
    category,
    isVegetarian,
    isAvailable
  } = req.body;

  try {
    const [result] = await pool.query(
      `
      INSERT INTO foods
      (
        name,
        description,
        price,
        image,
        prepTime,
        category,
        isVegetarian,
        isAvailable
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        description,
        price,
        image,
        prepTime,
        category,
        isVegetarian,
        isAvailable
      ]
    );

    res.json({
      message: "Food Added Successfully",
      id: result.insertId
    });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});