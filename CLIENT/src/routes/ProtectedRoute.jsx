import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = {
    role: "admin", 
  }
  if (!user) return <Navigate to="/" />;

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
  