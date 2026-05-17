import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import pool, { dbState } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { ensureUsersFile, getAllUsers } from './controllers/authController.js';
import { ensureOrdersFile } from './controllers/orderController.js';
import { ensureFoodsFile } from './controllers/foodController.js';

dotenv.config();

const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

// Express Middleware
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Database schema verification
const ensureTables = async () => {
  try {
    // Foods Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS foods (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        prepTime INT DEFAULT 15,
        category VARCHAR(100),
        isVegetarian BOOLEAN DEFAULT TRUE,
        isAvailable BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Orders Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        customer VARCHAR(255),
        email VARCHAR(255),
        items_json TEXT,
        items_list TEXT,
        total DECIMAL(10, 2),
        time VARCHAR(100),
        created_at DATETIME,
        status VARCHAR(50) DEFAULT 'Pending',
        timeSlotId INT,
        timeSlot VARCHAR(100),
        instructions TEXT
      )
    `);

    // Ensure email column exists if table was already created
    try {
      await pool.query(`ALTER TABLE orders ADD COLUMN email VARCHAR(255)`);
      console.log("✅ Orders table updated with email column.");
    } catch (alterErr) {
      // Column probably already exists or table doesn't exist, safe to ignore
    }

    dbState.dbAvailable = true;
    console.log("✅ Database tables successfully verified!");
  } catch (err) {
    console.warn('⚠️ Database tables initialization failed, falling back to file store:', err.message || err);
    dbState.dbAvailable = false;
    // ensure local stores exist as a fallback
    await ensureUsersFile();
    await ensureOrdersFile();
    await ensureFoodsFile();
  }
};

ensureTables();

// --- API Root Endpoint ---
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// --- Register Modular API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/admin/users', getAllUsers);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});