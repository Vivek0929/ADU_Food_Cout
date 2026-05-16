import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import fs from 'fs/promises';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';

// Simple fallback when DB is not configured: use a JSON file store.
let dbAvailable = true;
const USERS_FILE = new URL('./users_store.json', import.meta.url).pathname;

const ensureTables = async () => {
  try {
    // Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

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

    dbAvailable = true;
  } catch (err) {
    console.warn('Database tables initialization failed, falling back to file store:', err.message || err);
    dbAvailable = false;
    // create file if missing
    try {
      await fs.access(USERS_FILE);
    } catch (e) {
      await fs.writeFile(USERS_FILE, JSON.stringify([]));
    }
  }
};

ensureTables();

const readUsersFromFile = async () => {
  try {
    const txt = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(txt || '[]');
  } catch (e) {
    return [];
  }
};

const saveUsersToFile = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

const getUserByEmail = async (email) => {
  if (dbAvailable) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (e) {
      dbAvailable = false;
    }
  }
  const users = await readUsersFromFile();
  return users.find(u => u.email === email) || null;
};

const getUserById = async (id) => {
  if (dbAvailable) {
    try {
      const [rows] = await pool.query('SELECT id, email, name, role FROM users WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (e) {
      dbAvailable = false;
    }
  }
  const users = await readUsersFromFile();
  return users.find(u => u.id === id) || null;
};

const insertUser = async (user) => {
  if (dbAvailable) {
    try {
      const [result] = await pool.query('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)', [user.email, user.password, user.name, user.role]);
      return { ...user, id: result.insertId };
    } catch (e) {
      dbAvailable = false;
    }
  }
  const users = await readUsersFromFile();
  const id = (users.reduce((m, u) => Math.max(m, u.id || 0), 0) || 0) + 1;
  const newUser = { id, ...user };
  users.push(newUser);
  await saveUsersToFile(users);
  return newUser;
};


// --- API Directory (Home Page) ---------------------------------------------
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// --- Auth Routes ----------------------------------------------------------
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const existing = await getUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const role = email.toLowerCase().includes('Pranavsubbareddy11@smb.com') || email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
    const newUser = await insertUser({ email, password: hashed, name: name || '', role });

    const user = { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    // 1. Check for "Super Admin" credentials in .env
    const envAdminEmail = process.env.ADMIN_EMAIL;
    const envAdminPass = process.env.ADMIN_PASSWORD;

    if (envAdminEmail && envAdminPass && email === envAdminEmail && password === envAdminPass) {
      const user = { id: 0, email: envAdminEmail, name: 'Super Admin', role: 'admin' };
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
      return res.json({ user });
    }

    // 2. Normal database/file-store login
    const userRow = await getUserByEmail(email);
    if (!userRow) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, userRow.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const user = { id: userRow.id, email: userRow.email, name: userRow.name, role: userRow.role };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'lax' });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(200).json({ user: null });
    const decoded = jwt.verify(token, JWT_SECRET);
    // Fetch latest user info from DB or file store
    const user = await getUserById(decoded.id);
    return res.json({ user });
  } catch (err) {
    console.error('me error', err);
    res.clearCookie('token');
    return res.status(200).json({ user: null });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

// Admin Route to see all users (Email and Role)
app.get('/api/admin/users', async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });

    if (dbAvailable) {
      const [rows] = await pool.query('SELECT id, email, name, role, created_at FROM users');
      return res.json(rows);
    } else {
      const users = await readUsersFromFile();
      // Remove passwords from response
      const safeUsers = users.map(({ password, ...u }) => u);
      return res.json(safeUsers);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
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
  const { name, description, price, image, prepTime, category, isVegetarian, isAvailable } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO foods (name, description, price, image, prepTime, category, isVegetarian, isAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [name, description, price, image, prepTime, category, isVegetarian, isAvailable]
    );
    res.json({ message: "Food Added Successfully", id: result.insertId });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// UPDATE FOOD
app.put("/api/food/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, prepTime, category, isVegetarian, isAvailable } = req.body;
  try {
    await pool.query(
      "UPDATE foods SET name=?, description=?, price=?, image=?, prepTime=?, category=?, isVegetarian=?, isAvailable=? WHERE id=?",
      [name, description, price, image, prepTime, category, isVegetarian, isAvailable, id]
    );
    res.json({ message: "Food Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// DELETE FOOD
app.delete("/api/food/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM foods WHERE id = ?", [id]);
    res.json({ message: "Food Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});