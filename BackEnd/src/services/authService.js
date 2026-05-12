import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as UserModel from "../models/userModel.js";

export const register = async ({ name, email, password, studentId, phone }) => {
  const existing = await UserModel.findUserByEmail(email);
  if (existing) throw new Error("Email already registered");
  const hashed = await bcrypt.hash(password, 10);
  const user = await UserModel.createUser({ name, email, password: hashed, studentId, phone });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return { user, token };
};

export const login = async ({ email, password }) => {
  const user = await UserModel.findUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password");
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};

export const getProfile = async (userId) => {
  return UserModel.findUserById(userId);
};

export const updateProfile = async (userId, updates) => {
  return UserModel.updateUser(userId, updates);
};
