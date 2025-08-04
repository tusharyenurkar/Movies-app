import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Double-check admin authorization
    if (!userInfo) {
      toast.error("Please login to access admin panel");
      navigate("/login");
      return;
    }

    if (!userInfo.isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
      return;
    }

    // Welcome message for admin
    toast.success(`Welcome back, ${userInfo.username}!`);
  }, [userInfo, navigate]);

  // Show loading or redirect if not authorized
  if (!userInfo || !userInfo.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
