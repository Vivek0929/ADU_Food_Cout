import * as AuthService from "../services/authService.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await AuthService.getProfile(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) { next(err); }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await AuthService.updateProfile(req.user.id, req.body);
    res.json({ message: "Profile updated", user });
  } catch (err) { next(err); }
};
