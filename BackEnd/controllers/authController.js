import fs from 'fs/promises';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import pool, { dbState } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret_change_me';
const USERS_FILE = fileURLToPath(new URL('../users_store.json', import.meta.url));

// Helper: Ensure the users_store.json fallback file exists
export const ensureUsersFile = async () => {
  try {
    await fs.access(USERS_FILE);
  } catch (e) {
    await fs.writeFile(USERS_FILE, JSON.stringify([]));
  }
};

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
  if (dbState.dbAvailable) {
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (e) {
      dbState.dbAvailable = false;
    }
  }
  const users = await readUsersFromFile();
  return users.find(u => u.email === email) || null;
};

const getUserById = async (id) => {
  if (dbState.dbAvailable) {
    try {
      const [rows] = await pool.query('SELECT id, email, name, role FROM users WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (e) {
      dbState.dbAvailable = false;
    }
  }
  const users = await readUsersFromFile();
  return users.find(u => u.id === id) || null;
};

const insertUser = async (user) => {
  if (dbState.dbAvailable) {
    try {
      const [result] = await pool.query('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)', [user.email, user.password, user.name, user.role]);
      return { ...user, id: result.insertId };
    } catch (e) {
      dbState.dbAvailable = false;
    }
  }
  const users = await readUsersFromFile();
  const id = (users.reduce((m, u) => Math.max(m, u.id || 0), 0) || 0) + 1;
  const newUser = { id, ...user };
  users.push(newUser);
  await saveUsersToFile(users);
  return newUser;
};

// --- AUTH ROUTE HANDLERS --------------------------------------------------

// SIGNUP
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const existing = await getUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const role = email.toLowerCase().includes('pranavsubbareddy11@smb.com') || email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
    const newUser = await insertUser({ email, password: hashed, name: name || '', role });

    const user = { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup failed' });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    // 1. Check for "Super Admin" credentials in .env
    const envAdminEmail = process.env.ADMIN_EMAIL;
    const envAdminPass = process.env.ADMIN_PASSWORD;

    if (envAdminEmail && envAdminPass && email === envAdminEmail && password === envAdminPass) {
      const user = { id: 0, email: envAdminEmail, name: 'Super Admin', role: 'admin' };
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
      return res.json({ user });
    }

    // 2. Normal database/file-store login
    const userRow = await getUserByEmail(email);
    if (!userRow) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, userRow.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const user = { id: userRow.id, email: userRow.email, name: userRow.name, role: userRow.role };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

// ME (VERIFY USER)
export const me = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(200).json({ user: null });
    const decoded = jwt.verify(token, JWT_SECRET);
    // Fetch latest user info from DB or file store
    const user = await getUserById(decoded.id);
    return res.json({ user });
  } catch (err) {
    console.error('me error', err);
    res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
    return res.status(200).json({ user: null });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
  res.json({ ok: true });
};

// GET ALL USERS (Admin access required)
export const getAllUsers = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });

    if (dbState.dbAvailable) {
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
};
