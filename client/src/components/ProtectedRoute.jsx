import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // No token → redirect to home (or login popup trigger page)
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
