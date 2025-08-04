import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in
  if (!userInfo) {
    toast.error("Please login to access admin panel");
    return <Navigate to="/login" replace />;
  }

  // Check if user is admin
  if (!userInfo.isAdmin) {
    toast.error("Access denied. Admin privileges required.");
    return <Navigate to="/" replace />;
  }

  // User is authenticated and is admin
  return <Outlet />;
};

export default AdminRoute;
