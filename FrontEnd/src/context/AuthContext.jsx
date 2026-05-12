import { createContext, useState, useEffect, useCallback } from "react";
import * as AuthService from "../services/authService.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => AuthService.getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthService.login(credentials);
      setUser(res.user);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AuthService.register(data);
      setUser(res.user);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setUser(null);
  }, []);

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated, isAdmin,
      login, register, logout,
      loading, error, clearError,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
