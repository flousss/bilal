import { useState, useEffect } from 'react';
import { weatherApi } from '../services/weatherApi';

export const useWeather = (city, units = 'metric') => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city, units]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const weatherRes = await weatherApi.getCurrentWeather(city, units);
      const forecastRes = await weatherApi.getForecast(city, units);
      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => fetchWeather();

  return { weather, forecast, loading, error, refresh };
};
