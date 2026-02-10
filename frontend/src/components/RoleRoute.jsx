import { Navigate } from "react-router-dom";

export default function RoleRoute({ role, children }) {
  const userRole = sessionStorage.getItem("role");
  return userRole === role ? children : <Navigate to="/" />;
}
