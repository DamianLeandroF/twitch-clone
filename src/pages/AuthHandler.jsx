import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState("Procesando inicio de sesión...");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      setStatus("Error de autenticación: Permiso denegado por el usuario.");
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    if (code) {
      // Enviar el código de autorización al backend para intercambio
      const exchangeCode = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/auth/twitch/callback",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ code }),
            }
          );

          const data = await response.json();

          if (data.success) {
            // Usar la función login del contexto para actualizar el estado
            login(data.user, data.access_token);
            setStatus(`¡Bienvenido, ${data.user.name}! Redirigiendo...`);

            setTimeout(() => navigate("/"), 1500);
          } else {
            setStatus(`Fallo de login: ${data.error}`);
          }
        } catch (e) {
          setStatus("Fallo de conexión con el servidor de autenticación.");
          console.error("Error de fetch:", e);
        }
      };
      exchangeCode();
    } else {
      setStatus("Error: Código de autenticación no recibido.");
      setTimeout(() => navigate("/"), 3000);
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <p className="text-xl text-purple-400">{status}</p>
    </div>
  );
};

export default AuthHandler;
