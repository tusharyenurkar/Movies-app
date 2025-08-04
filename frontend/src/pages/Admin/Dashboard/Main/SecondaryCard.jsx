const SecondaryCard = ({ pill, content, info, gradient, icon }) => {
  return (
    <div
      className={`w-full h-32 relative bg-gradient-to-br ${gradient} rounded-lg shadow-lg p-6 transition-transform duration-200 hover:scale-105`}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {icon && <div className="text-white opacity-80">{icon}</div>}
            <span className="text-sm font-semibold text-white bg-black bg-opacity-20 px-3 py-1 rounded-full">
              {pill}
            </span>
          </div>
          
          <div className="mb-2">
            <h2 className="text-3xl font-bold text-white">{content}</h2>
          </div>
          
          <div className="text-xs text-white opacity-80">{info}</div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryCard;
