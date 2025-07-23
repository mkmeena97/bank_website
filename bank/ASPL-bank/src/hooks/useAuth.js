import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Convenient shortcut, so instead of:
//   const { user } = useContext(AuthContext);
// you can do:
//   const { user } = useAuth();
export default function useAuth() {
  return useContext(AuthContext);
}
