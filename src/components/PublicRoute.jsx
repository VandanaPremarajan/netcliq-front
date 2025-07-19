import { Outlet, Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ isAuthenticated }) => {
  const location = useLocation();

  if (isAuthenticated) {
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/dashboard" />;
    } else if (location.pathname.startsWith("/subscriber")) {
      return <Navigate to="/subscriber/browse" />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
