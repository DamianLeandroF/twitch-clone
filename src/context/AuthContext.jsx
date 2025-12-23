import React, { useState } from "react";
import { AuthContext } from "./authContextInstance";

// Proveedor del Contexto de Autenticación

// 2. Crear el Proveedor (Provider)
export const AuthProvider = ({ children }) => {
  // Intentar cargar el usuario de localStorage al inicio
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("twitchUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, accessToken) => {
    // Guardar el token y los datos del usuario
    localStorage.setItem("twitchAccessToken", accessToken);
    localStorage.setItem("twitchUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // Limpiar almacenamiento y estado
    localStorage.removeItem("twitchAccessToken");
    localStorage.removeItem("twitchUser");
    setUser(null);
  };

  const value = {
    user, // { id, name, profile_image_url } o null
    isLoggedIn: !!user, // Booleano: ¿El usuario está logueado?
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
