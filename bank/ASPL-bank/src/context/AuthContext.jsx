import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosInstance";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        setLoading(true);
        try {
          const username = localStorage.getItem("username");
          const res = await fetch(
            `http://localhost:8072/api/auth/profile/${username}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (res.ok) {
            const profile = await res.json();
            setUser(profile);
          } else {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("username");
          }
        } catch (err) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("username");
        }
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  // Registration (no change)
  const register = async (data) => {
    const res = await fetch("http://localhost:8072/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return true;
  };

  // Login: stores token, refreshToken, idToken if present
  const login = async (username, password) => {
    const res = await fetch("http://localhost:8072/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error(await res.text());
    const body = await res.json();
    setToken(body.token);
    localStorage.setItem("token", body.token);
    if (body.refreshToken) localStorage.setItem("refresh_token", body.refreshToken);
    if (body.idToken) localStorage.setItem("id_token", body.idToken);
    localStorage.setItem("username", username);
    setUser({
      username: body.username || username,
      email: body.email,
      mobileNumber: body.mobileNumber,
      firstName: body.firstName,
      role: body.role,
    });
    return true;
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("username");
  };

  // Update profile (no change)
  const updateProfile = async (profile) => {
    const res = await fetch(
      `http://localhost:8072/api/auth/profile/${profile.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      }
    );
    if (!res.ok) throw new Error(await res.text());
    setUser(profile);
    return true;
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    loading,
    register,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
