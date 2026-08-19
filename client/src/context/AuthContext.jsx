import { createContext, useContext, useState } from "react";
import * as authService from "../Services/authService";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const existingToken = authService.getToken();
  const existingPayload = existingToken ? authService.decodeToken(existingToken) : null;

  const [isLoggedIn, setIsLoggedIn] = useState(!!existingToken);
  const [role, setRole] = useState(existingPayload?.role || null);

  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    authService.saveToken(data.token);

    const payload = authService.decodeToken(data.token);
    setRole(payload?.role || null);
    setIsLoggedIn(true);
  };

  const logout = () => {
    authService.clearToken();
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, isAdmin: role === "ADMIN", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit etre utilise a l'interieur d'un AuthProvider");
  }
  return context;
};