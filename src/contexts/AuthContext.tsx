"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getItem, setItem, removeItem, generateId } from "@/lib/storage";

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: "super_admin" | "manager" | "analyst" | "viewer";
  avatar?: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  users: User[];
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "sentri_auth";
const USERS_KEY = "sentri_users";

const defaultUsers: User[] = [
  { id: "admin-1", name: "Admin", email: "admin@sentri.com", company: "Sentri Inc.", role: "super_admin" },
  { id: "manager-1", name: "Manager", email: "manager@sentri.com", company: "Sentri Inc.", role: "manager" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const saved = getItem<User | null>(STORAGE_KEY, null);
    if (saved) setUser(saved);
    setUsers(getItem<User[]>(USERS_KEY, defaultUsers));
  }, []);

  useEffect(() => {
    if (user) setItem(STORAGE_KEY, user);
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 300));
    const allUsers = getItem<User[]>(USERS_KEY, defaultUsers);
    const found = allUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: "Email not found. Please check your credentials." };
    }
    setUsers(allUsers);
    setUser(found);
    return { success: true };
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 300));
    const allUsers = getItem<User[]>(USERS_KEY, defaultUsers);
    if (allUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      company: "",
      role: "manager",
    };
    const updated = [...allUsers, newUser];
    setItem(USERS_KEY, updated);
    setUsers(updated);
    setUser(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    removeItem(STORAGE_KEY);
    router.push("/auth/login");
  }, [router]);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      const allUsers = getItem<User[]>(USERS_KEY, defaultUsers);
      const idx = allUsers.findIndex((u) => u.id === prev.id);
      if (idx >= 0) {
        allUsers[idx] = updated;
        setItem(USERS_KEY, allUsers);
        setUsers(allUsers);
      }
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateProfile, users }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

