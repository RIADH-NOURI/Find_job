"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../redux/apis/public/auth";
import Loader from "@/components/moleculles/loader";

interface AuthContextType {
  token: string | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  id: string | null;
  role: string | null;
  isAuthenticated: boolean;
  error: boolean;
  user: string | null;
  setUser: (user: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: () => {},
  id: null,
  role: null,
  isAuthenticated: false,
  error: false,
  user: null,
  setUser: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [loginMutation] = useLoginMutation();

  const loadAuthData = () => {
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("username");

    if (storedToken && storedId && storedRole && storedUser) {
      setToken(storedToken);
      setId(storedId);
      setRole(storedRole);
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setTimeout(() => {
      setLoading(false);
      }, 3000);
    setLoading(false);
  };

  // Authentication Management
useEffect(() => {
  if (typeof window !== "undefined") {
    loadAuthData();

    const publicRoutes = ["/forgot-password", "/reset-password"];
    const currentPath = window.location.pathname;

    if (!localStorage.getItem("token") && !publicRoutes.includes(currentPath)) {
      router.push("/");
    }
    
  }
}, [router]);


  // Login logic function
  const login = async (credentials: { email: string; password: string }) => {
    try {
      if (!credentials.email || !credentials.password) {
        alert("Please enter both email and password.");
        return;
      }

      const response = await loginMutation(credentials).unwrap();
      if (response.status === 401) {
        alert("Invalid email or password.");
        return;
      }
      const { token, role, id, expiresAt ,username} = response || {};

      if (!token || !role || !id || !expiresAt || !username) {
        throw new Error("Invalid response from server.");
      }

      // Save data to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", id.toString());
      localStorage.setItem("expiresAt", expiresAt.toString());
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      // Update state
      setRole(role);
      setToken(token);
      setId(id.toString());
      setUser(username);
      setIsAuthenticated(true);

      // Redirect based on role
      const redirectPath = role === "USER" ? `/${username}` : `dashboard/${id}`;
      router.push(redirectPath);
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
    }
  };

  // Logout function
  const logout = () => {
    ["token", "user", "role", "expiresAt"].forEach((item) => localStorage.removeItem(item));
    setToken(null);
    setId(null);
    setRole(null);
    setIsAuthenticated(false);
    router.push("/");
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><Loader /></div>;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, id, role, error, user,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
