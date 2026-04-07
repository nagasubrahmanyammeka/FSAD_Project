import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AUTH_URL = "http://localhost:2026/api/auth";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // =========================
  // ✅ LOGIN (USERNAME + PASSWORD + ROLE)
  // =========================
  const login = async (username, password, role) => {
    try {
      const res = await axios.post(`${AUTH_URL}/login`, {
        username,
        password,
        role, // ✅ sending role (your requirement)
      });

      const userData = res.data;

      // ✅ store user
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return { success: true, user: userData };

    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        message:
          error.response?.data ||
          error.response?.data?.message ||
          "Login failed. Please try again.",
      };
    }
  };

  // =========================
  // ✅ REGISTER
  // =========================
  const register = async (data) => {
    try {
      const payload = {
        ...data,
        role: data.role?.toUpperCase(), // ✅ ensure role uppercase
      };

      const res = await axios.post(`${AUTH_URL}/register`, payload);

      const userData = res.data;

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      return { success: true, user: userData };

    } catch (error) {
      console.error("Register error:", error);

      return {
        success: false,
        message:
          error.response?.data ||
          error.response?.data?.message ||
          "Registration failed",
      };
    }
  };

  // =========================
  // ✅ LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // =========================
  // ✅ HELPERS
  // =========================
  const isAuthenticated = () => !!user;

  const hasRole = (role) =>
    user?.role?.toUpperCase() === role?.toUpperCase();

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}