const express = require('express');
const router = express.Router();
const weatherService = require('../services/openWeatherService');

// Get current weather
router.get('/current', async (req, res) => {
  try {
    const { city, units = 'metric' } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const weather = await weatherService.getCurrentWeather(city, units);
    res.json(weather);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Get forecast
router.get('/forecast', async (req, res) => {
  try {
    const { city, units = 'metric' } = req.query;

    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }

    const forecast = await weatherService.getForecast(city, units);
    res.json(forecast);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Get weather by coordinates
router.get('/geo', async (req, res) => {
  try {
    const { lat, lon, units = 'metric' } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const weather = await weatherService.getWeatherByCoordinates(lat, lon, units);
    res.json(weather);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Search cities
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    const cities = await weatherService.searchCities(q);
    res.json(cities);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// Get weather for multiple cities
router.get('/cities', async (req, res) => {
  try {
    const { cities, units = 'metric' } = req.query;

    if (!cities) {
      return res.status(400).json({ error: 'Cities parameter is required' });
    }

    const cityList = typeof cities === 'string' ? cities.split(',') : cities;
    const results = await weatherService.getMultipleCities(cityList, units);
    res.json(results);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
