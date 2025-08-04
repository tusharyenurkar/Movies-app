import { useEffect, useState } from "react";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";
import { FaUsers, FaComments, FaFilm, FaChartLine } from "react-icons/fa";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies, isLoading: loadingTopMovies } = useGetTopMoviesQuery();
  const { data: visitors, isLoading: loadingVisitors } = useGetUsersQuery();
  const { data: allMovies, isLoading: loadingMovies } = useGetAllMoviesQuery();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalComments: 0,
    totalMovies: 0,
    averageRating: 0
  });

  useEffect(() => {
    if (allMovies && visitors) {
      const totalCommentsLength = allMovies?.map((m) => m.numReviews || 0);
      const sumOfCommentsLength = totalCommentsLength?.reduce(
        (acc, length) => acc + length,
        0
      );

      const totalRating = allMovies?.reduce((acc, movie) => acc + (movie.rating || 0), 0);
      const averageRating = allMovies?.length > 0 ? (totalRating / allMovies.length).toFixed(1) : 0;

      setStats({
        totalUsers: visitors?.length || 0,
        totalComments: sumOfCommentsLength || 0,
        totalMovies: allMovies?.length || 0,
        averageRating: averageRating
      });
    }
  }, [allMovies, visitors]);

  if (loadingTopMovies || loadingVisitors || loadingMovies) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your movie application</p>
      </div>

      {/* Statistics Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SecondaryCard
            pill="Total Users"
            content={stats.totalUsers}
            info={`${Math.floor(stats.totalUsers * 0.1)} new this week`}
            gradient="from-blue-500 to-cyan-400"
            icon={<FaUsers className="w-6 h-6" />}
          />
          <SecondaryCard
            pill="Total Comments"
            content={stats.totalComments}
            info={`${Math.floor(stats.totalComments * 0.15)} new this week`}
            gradient="from-yellow-500 to-orange-400"
            icon={<FaComments className="w-6 h-6" />}
          />
          <SecondaryCard
            pill="Total Movies"
            content={stats.totalMovies}
            info={`${Math.floor(stats.totalMovies * 0.2)} new this month`}
            gradient="from-green-500 to-lime-400"
            icon={<FaFilm className="w-6 h-6" />}
          />
          <SecondaryCard
            pill="Avg Rating"
            content={stats.averageRating}
            info="Across all movies"
            gradient="from-purple-500 to-pink-400"
            icon={<FaChartLine className="w-6 h-6" />}
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Movies */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Top Rated Movies</h2>
              <span className="text-sm text-gray-400">{topMovies?.length} movies</span>
            </div>
            
            <div className="space-y-4">
              {topMovies?.slice(0, 5).map((movie) => (
                <VideoCard
                  key={movie._id}
                  image={movie.image}
                  title={movie.name}
                  date={movie.year}
                  comments={movie.numReviews}
                  rating={movie.rating}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Activity */}
        <div>
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
};

export default Main;
