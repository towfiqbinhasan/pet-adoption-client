import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent"></div>
      </div>
    );
  }

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;