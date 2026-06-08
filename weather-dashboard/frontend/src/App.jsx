import { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiSettings, FiRefreshCw } from 'react-icons/fi';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import LocationList from './components/LocationList';
import Settings from './components/Settings';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';

function App() {
  const [city, setCity] = useState('London');
  const [units, setUnits] = useState('metric');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteWeatherCities');
    return saved ? JSON.parse(saved) : ['London', 'New York', 'Tokyo'];
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const { weather, forecast, loading, error, refresh } = useWeather(city, units);
  const { location, getLocation } = useGeolocation();

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favoriteWeatherCities', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddFavorite = () => {
    if (city && !favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const handleRemoveFavorite = (favCity) => {
    setFavorites(favorites.filter(c => c !== favCity));
  };

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    setShowFavorites(false);
  };

  const handleUnitChange = (newUnit) => {
    setUnits(newUnit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      {/* Header */}
      <header className="bg-black bg-opacity-30 backdrop-blur-md border-b border-white border-opacity-10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <h1 className="text-3xl font-bold text-white">🌤️ Weather Dashboard</h1>
            <div className="flex gap-2">
              <button
                onClick={getLocation}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-all"
                title="Get current location"
              >
                <FiMapPin size={20} />
              </button>
              <button
                onClick={refresh}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-all"
                title="Refresh weather"
              >
                <FiRefreshCw size={20} />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-all"
                title="Settings"
              >
                <FiSettings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <SearchBar onCitySelect={setCity} />

        {/* Settings Panel */}
        {showSettings && (
          <Settings
            units={units}
            onUnitsChange={handleUnitChange}
            onClose={() => setShowSettings(false)}
          />
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500 bg-opacity-90 text-white rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setCity('')}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-opacity-30 border-t-white"></div>
            <p className="text-white mt-4">Loading weather data...</p>
          </div>
        )}

        {/* Content Grid */}
        {!loading && weather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Current Weather & Forecast */}
            <div className="lg:col-span-2 space-y-6">
              <CurrentWeather
                weather={weather}
                units={units}
                onAddFavorite={handleAddFavorite}
                isFavorite={favorites.includes(city)}
              />
              {forecast && <Forecast forecast={forecast} units={units} />}
            </div>

            {/* Right Column - Favorites */}
            <div>
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  ⭐ Favorites ({favorites.length})
                </button>

                {showFavorites && (
                  <LocationList
                    cities={favorites}
                    onSelectCity={handleSelectCity}
                    onRemoveFavorite={handleRemoveFavorite}
                    currentCity={city}
                  />
                )}
              </div>

              {/* Quick Stats */}
              {weather && (
                <div className="mt-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
                  <h3 className="text-white font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-3 text-sm text-white">
                    <div className="flex justify-between">
                      <span>Humidity:</span>
                      <span className="font-semibold">{weather.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind Speed:</span>
                      <span className="font-semibold">{weather.wind_speed} m/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pressure:</span>
                      <span className="font-semibold">{weather.pressure} hPa</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Visibility:</span>
                      <span className="font-semibold">{(weather.visibility / 1000).toFixed(1)} km</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-30 border-t border-white border-opacity-10 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-white text-sm">
          <p>Weather data provided by OpenWeatherMap API</p>
          <p className="mt-2 text-gray-300">Created with React, Tailwind CSS, and OpenWeatherMap</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
