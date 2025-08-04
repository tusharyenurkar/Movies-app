import { FaStar, FaComments } from "react-icons/fa";

const VideoCard = ({ image, title, date, comments, rating }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200">
      <div className="flex-shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="h-12 w-12 object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-white truncate">{title}</h3>
        <p className="text-xs text-gray-400">{date}</p>
      </div>

      <div className="flex items-center space-x-4">
        {rating && (
          <div className="flex items-center space-x-1">
            <FaStar className="w-3 h-3 text-yellow-400" />
            <span className="text-xs text-white">{rating.toFixed(1)}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-1">
          <FaComments className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400">{comments || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
