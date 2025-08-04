import { useGetUsersQuery } from "../../../../redux/api/users";
import { useGetAllMoviesQuery } from "../../../../redux/api/movies";
import { FaUsers, FaFilm, FaClock, FaChartLine } from "react-icons/fa";

const RealTimeCard = () => {
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const recentUsers = visitors?.slice(-5) || [];
  const recentMovies = allMovies?.slice(-3) || [];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <FaClock className="w-5 h-5 text-green-400" />
        <h2 className="text-xl font-semibold text-white">Real-time Activity</h2>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <FaUsers className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Total Users</span>
          </div>
          <p className="text-2xl font-bold text-white mt-1">{visitors?.length || 0}</p>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <FaFilm className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Total Movies</span>
          </div>
          <p className="text-2xl font-bold text-white mt-1">{allMovies?.length || 0}</p>
        </div>
      </div>

      {/* Recent Users */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Recent Users</h3>
        <div className="space-y-2">
          {recentUsers.map((user, index) => (
            <div key={user._id || index} className="flex items-center space-x-3 p-2 bg-gray-700 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {user.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{user.username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Movies */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-3">Recent Movies</h3>
        <div className="space-y-2">
          {recentMovies.map((movie, index) => (
            <div key={movie._id || index} className="flex items-center space-x-3 p-2 bg-gray-700 rounded-lg">
              <img 
                src={movie.image} 
                alt={movie.name}
                className="w-8 h-8 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-white truncate">{movie.name}</p>
                <p className="text-xs text-gray-400">{movie.year}</p>
              </div>
              <div className="flex items-center space-x-1">
                <FaChartLine className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-white">{movie.rating?.toFixed(1) || '0.0'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeCard;
