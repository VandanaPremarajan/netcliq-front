import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated }) => {
  const location = useLocation();
  if (!isAuthenticated) {
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" />;
    } else if (location.pathname.startsWith("/subscriber")) {
      return <Navigate to="/subscriber/login" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
