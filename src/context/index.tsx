"use client";

import { User } from "@/types/auth";
import { createContext, useState, ReactNode, useContext } from "react";

interface AppContextType {
  user: User | undefined;
  setUser: (user: User) => void;
  token: string | null;
  setToken: (token: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>("");
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        loading,
        setLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }

  return context;
};
