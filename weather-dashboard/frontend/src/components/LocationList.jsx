import { FiX, FiTrash2 } from 'react-icons/fi';

const LocationList = ({ cities, onSelectCity, onRemoveFavorite, currentCity }) => {
  return (
    <div className="space-y-2">
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelectCity(city)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-all flex justify-between items-center ${
            currentCity === city
              ? 'bg-blue-500 text-white'
              : 'bg-white bg-opacity-10 text-gray-100 hover:bg-opacity-20'
          }`}
        >
          <span>{city}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveFavorite(city);
            }}
            className="p-1 hover:bg-red-500 hover:bg-opacity-50 rounded transition-colors"
          >
            <FiTrash2 size={16} />
          </button>
        </button>
      ))}
    </div>
  );
};

export default LocationList;
