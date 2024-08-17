import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Spinner from "./components/Spinner";

export const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};
