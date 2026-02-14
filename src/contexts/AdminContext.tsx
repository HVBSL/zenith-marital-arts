import React, { createContext, useContext, useState, ReactNode } from "react";

interface AdminUser {
  name: string;
  mobile: string;
  status: string;
}

interface AdminContextType {
  user: AdminUser | null;
  isLoggedIn: boolean;
  login: (user: AdminUser) => void;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem("adminUser");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData: AdminUser) => {
    setUser(userData);
    localStorage.setItem("adminUser", JSON.stringify(userData));
    localStorage.setItem("adminLoggedIn", "true");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminLoggedIn");
  };

  const value: AdminContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
