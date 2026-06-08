import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherApi = {
  // Get current weather
  getCurrentWeather: (city, units = 'metric') =>
    api.get('/weather/current', { params: { city, units } }),

  // Get forecast
  getForecast: (city, units = 'metric') =>
    api.get('/weather/forecast', { params: { city, units } }),

  // Get weather by coordinates
  getWeatherByCoordinates: (lat, lon, units = 'metric') =>
    api.get('/weather/geo', { params: { lat, lon, units } }),

  // Search cities
  searchCities: (query) =>
    api.get('/weather/search', { params: { q: query } }),

  // Get multiple cities weather
  getMultipleCities: (cities, units = 'metric') =>
    api.get('/weather/cities', { params: { cities: cities.join(','), units } }),
};

export default api;
