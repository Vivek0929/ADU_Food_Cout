import * as AuthService from "../services/authService.js";

export const register = async (req, res, next) => {
  try {
    const result = await AuthService.register(req.body);
    res.status(201).json({ message: "Registered successfully", ...result });
  } catch (err) {
    if (err.message === "Email already registered") return res.status(409).json({ message: err.message });
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body);
    res.json({ message: "Login successful", ...result });
  } catch (err) {
    if (err.message === "Invalid email or password") return res.status(401).json({ message: err.message });
    next(err);
  }
};
