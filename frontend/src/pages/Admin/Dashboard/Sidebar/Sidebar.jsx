import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaPlus, FaList, FaEdit, FaComments, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: "/admin/movies/dashboard",
      name: "Dashboard",
      icon: <FaHome className="w-5 h-5" />
    },
    {
      path: "/admin/movies/create",
      name: "Create Movie",
      icon: <FaPlus className="w-5 h-5" />
    },
    {
      path: "/admin/movies/genre",
      name: "Manage Genres",
      icon: <FaList className="w-5 h-5" />
    },
    {
      path: "/admin/movies-list",
      name: "Update Movies",
      icon: <FaEdit className="w-5 h-5" />
    },
    {
      path: "/admin/movies/comments",
      name: "Comments",
      icon: <FaComments className="w-5 h-5" />
    },
    {
      path: "/admin/users",
      name: "User Management",
      icon: <FaUsers className="w-5 h-5" />
    }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white shadow-lg">
      {/* Admin User Info */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <FaUser className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{userInfo?.username}</h3>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-green-500 to-lime-400 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
