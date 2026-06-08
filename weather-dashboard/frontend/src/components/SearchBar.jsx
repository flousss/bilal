import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { weatherApi } from '../services/weatherApi';

const SearchBar = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      setSearching(true);
      const response = await weatherApi.searchCities(value);
      setSuggestions(response.data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectCity = (cityName) => {
    onCitySelect(cityName);
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSelectCity(query.trim());
    }
  };

  return (
    <div className="mb-8 relative">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search weather by city..."
              value={query}
              onChange={handleInputChange}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              className="w-full px-4 py-3 pl-10 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-opacity-30 backdrop-blur-md"
            />
            <FiSearch className="absolute left-3 top-3.5 text-white text-opacity-60" size={20} />

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white bg-opacity-95 rounded-lg shadow-lg z-50">
                {suggestions.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectCity(`${city.name}, ${city.country}`)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-100 transition-colors text-gray-800 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="font-semibold">{city.name}</div>
                    <div className="text-sm text-gray-600">{city.state && `${city.state}, `}{city.country}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
