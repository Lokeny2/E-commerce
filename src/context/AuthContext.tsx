import React, { createContext, useContext, useEffect, useState } from "react";

type User = { id: string; name: string; email: string; role?: string };

type AuthContextValue = {
  user: User | null;
  signin: (email: string, name?: string) => Promise<void>;
  signout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth.user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem("auth.user", JSON.stringify(user));
      else localStorage.removeItem("auth.user");
    } catch {}
  }, [user]);

  async function signin(email: string, name = "") {
    // mock signin: create a user object
    const u: User = {
      id: `u_${Date.now()}`,
      email,
      name: name || email.split("@")[0],
      role: "user",
    };
    setUser(u);
  }

  function signout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
