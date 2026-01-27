import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const ProtectRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading || user === undefined) {
    return <h3>Loading...</h3>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

