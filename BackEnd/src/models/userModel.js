import pool from "../config/db.js";

export const createUser = async (user) => {
  const { name, email, password, role = "user", studentId = null, phone = null } = user;
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role, studentId, phone) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, password, role, studentId, phone]
  );
  return { id: result.insertId, name, email, role, studentId, phone };
};

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, name, email, role, studentId, phone, createdAt FROM users WHERE id = ?",
    [id]
  );
  return rows[0];
};

export const updateUser = async (id, updates) => {
  const { name, phone, studentId } = updates;
  await pool.query(
    "UPDATE users SET name=?, phone=?, studentId=? WHERE id=?",
    [name, phone, studentId, id]
  );
  return findUserById(id);
};
