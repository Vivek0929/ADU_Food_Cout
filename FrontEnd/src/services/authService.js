import api from "./api.js";

const TOKEN_KEY = "canteen_token";
const USER_KEY = "canteen_user";

export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  localStorage.setItem(TOKEN_KEY, res.token);
  localStorage.setItem(USER_KEY, JSON.stringify(res.user));
  return res;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  localStorage.setItem(TOKEN_KEY, res.token);
  localStorage.setItem(USER_KEY, JSON.stringify(res.user));
  return res;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredUser = () => {
  try {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  } catch { return null; }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = () => !!getToken();

export const getProfile = () => api.get("/users/profile");

export const updateProfile = (data) => api.put("/users/profile", data);
