import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

export const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to="/" replace />;
  return <Outlet />;
};
