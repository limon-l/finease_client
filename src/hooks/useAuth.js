import { useContext } from "react";
import { AuthContext } from "../context/AuthContext1";

export const useAuth = () => useContext(AuthContext);
