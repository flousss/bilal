import { FiStar } from 'react-icons/fi';
import { FiShare2 } from 'react-icons/fi';

const CurrentWeather = ({ weather, units, onAddFavorite, isFavorite }) => {
  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '🌤️', '02n': '🌤️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[iconCode] || '🌡️';
  };

  const tempUnit = units === 'metric' ? '°C' : '°F';
  const speedUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="bg-gradient-to-br from-white from-opacity-20 to-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-30 shadow-2xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-white text-4xl font-bold">{weather.city}, {weather.country}</h2>
          <p className="text-gray-200 mt-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <button
          onClick={onAddFavorite}
          className={`p-3 rounded-lg transition-all ${
            isFavorite
              ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-800'
              : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiStar size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Main Weather */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-9xl mb-4 animate-float">{getWeatherIcon(weather.icon)}</div>
            <div className="text-7xl font-bold text-white mb-2">{weather.temp}{tempUnit}</div>
            <div className="text-2xl text-gray-200 mb-4 capitalize">{weather.description}</div>
            <p className="text-gray-300 text-lg">Feels like {weather.feels_like}{tempUnit}</p>
          </div>
        </div>

        {/* Right - Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <p className="text-gray-300 text-sm mb-1">Min / Max</p>
            <p className="text-white text-2xl font-semibold">{weather.temp_min}{tempUnit} / {weather.temp_max}{tempUnit}</p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <p className="text-gray-300 text-sm mb-1">Humidity</p>
            <p className="text-white text-2xl font-semibold">{weather.humidity}%</p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <p className="text-gray-300 text-sm mb-1">Wind Speed</p>
            <p className="text-white text-2xl font-semibold">{weather.wind_speed} {speedUnit}</p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <p className="text-gray-300 text-sm mb-1">Wind Gust</p>
            <p className="text-white text-2xl font-semibold">{weather.wind_gust} {speedUnit}</p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <p className="text-gray-300 text-sm mb-1">Pressure</p>
            <p className="text-white text-2xl font-semibold">{weather.pressure} hPa</p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <p className="text-gray-300 text-sm mb-1">Visibility</p>
            <p className="text-white text-2xl font-semibold">{(weather.visibility / 1000).toFixed(1)} km</p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <p className="text-gray-300 text-sm mb-1">Sunrise</p>
            <p className="text-white text-2xl font-semibold">{weather.sunrise}</p>
          </div>

          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <p className="text-gray-300 text-sm mb-1">Sunset</p>
            <p className="text-white text-2xl font-semibold">{weather.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
