import { useContext } from "react";
import { AuthContext } from "../context/authContextInstance";

export const useAuth = () => {
  return useContext(AuthContext);
};
