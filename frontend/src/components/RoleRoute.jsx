import { Navigate } from "react-router-dom";

export default function RoleRoute({ role, children }) {
  const userRole = localStorage.getItem("role");
  return userRole === role ? children : <Navigate to="/" />;
}
