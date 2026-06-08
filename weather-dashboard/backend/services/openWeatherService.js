const axios = require('axios');
const NodeCache = require('node-cache');

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';
const CACHE_ENABLED = process.env.CACHE_ENABLED !== 'false';
const CACHE_TTL = parseInt(process.env.CACHE_TTL || '600');

const cache = new NodeCache({ stdTTL: CACHE_TTL });

if (!API_KEY) {
  console.error('❌ OPENWEATHER_API_KEY not set in environment variables');
}

class OpenWeatherService {
  // Get current weather
  async getCurrentWeather(city, units = 'metric') {
    const cacheKey = `current-${city}-${units}`;
    
    if (CACHE_ENABLED && cache.has(cacheKey)) {
      console.log('📦 Cache hit for', cacheKey);
      return cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${BASE_URL}/data/2.5/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: units
        }
      });

      const data = this.formatCurrentWeather(response.data);
      
      if (CACHE_ENABLED) {
        cache.set(cacheKey, data);
      }
      
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get forecast
  async getForecast(city, units = 'metric') {
    const cacheKey = `forecast-${city}-${units}`;
    
    if (CACHE_ENABLED && cache.has(cacheKey)) {
      console.log('📦 Cache hit for', cacheKey);
      return cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${BASE_URL}/data/2.5/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: units
        }
      });

      const data = this.formatForecast(response.data);
      
      if (CACHE_ENABLED) {
        cache.set(cacheKey, data);
      }
      
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get weather by coordinates
  async getWeatherByCoordinates(lat, lon, units = 'metric') {
    const cacheKey = `geo-${lat}-${lon}-${units}`;
    
    if (CACHE_ENABLED && cache.has(cacheKey)) {
      console.log('📦 Cache hit for', cacheKey);
      return cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${BASE_URL}/data/2.5/weather`, {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: units
        }
      });

      const data = this.formatCurrentWeather(response.data);
      
      if (CACHE_ENABLED) {
        cache.set(cacheKey, data);
      }
      
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Search cities
  async searchCities(query) {
    const cacheKey = `search-${query}`;
    
    if (CACHE_ENABLED && cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    try {
      const response = await axios.get(`${BASE_URL}/geo/1.0/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY
        }
      });

      const data = response.data.map(city => ({
        name: city.name,
        country: city.country,
        state: city.state || '',
        lat: city.lat,
        lon: city.lon
      }));
      
      if (CACHE_ENABLED) {
        cache.set(cacheKey, data);
      }
      
      return data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get weather for multiple cities
  async getMultipleCities(cities, units = 'metric') {
    const requests = cities.map(city => this.getCurrentWeather(city, units));
    const results = await Promise.allSettled(requests);

    return results.map((result, index) => ({
      city: cities[index],
      data: result.status === 'fulfilled' ? result.value : { error: result.reason.message }
    }));
  }

  // Format current weather response
  formatCurrentWeather(data) {
    return {
      city: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      feels_like: Math.round(data.main.feels_like),
      temp_min: Math.round(data.main.temp_min),
      temp_max: Math.round(data.main.temp_max),
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg || 0,
      wind_gust: data.wind.gust || 0,
      clouds: data.clouds.all,
      description: data.weather[0].main,
      detail: data.weather[0].description,
      icon: data.weather[0].icon,
      visibility: data.visibility,
      uvi: data.uvi || 'N/A',
      rain: data.rain?.['1h'] || 0,
      snow: data.snow?.['1h'] || 0,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      timezone: data.timezone,
      lat: data.coord.lat,
      lon: data.coord.lon
    };
  }

  // Format forecast response
  formatForecast(data) {
    const dailyForecasts = {};

    // Group by day
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push({
        dt: item.dt,
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like),
        temp_min: Math.round(item.main.temp_min),
        temp_max: Math.round(item.main.temp_max),
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        wind_speed: item.wind.speed,
        wind_deg: item.wind.deg || 0,
        clouds: item.clouds.all,
        description: item.weather[0].main,
        detail: item.weather[0].description,
        icon: item.weather[0].icon,
        pop: item.pop, // Probability of precipitation
        rain: item.rain?.['3h'] || 0
      });
    });

    // Get daily summary
    const days = Object.entries(dailyForecasts).map(([date, hours]) => {
      const temps = hours.map(h => h.temp);
      const mainWeather = hours[0].description; // Use first forecast of the day
      const icon = hours[0].icon;

      return {
        date: date,
        day: new Date(hours[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temp_min: Math.min(...temps),
        temp_max: Math.max(...temps),
        temp_avg: Math.round(temps.reduce((a, b) => a + b) / temps.length),
        description: mainWeather,
        icon: icon,
        hourly: hours.slice(0, 8) // First 8 forecasts (24 hours)
      };
    });

    return {
      city: data.city.name,
      country: data.city.country,
      days: days.slice(0, 5) // 5-day forecast
    };
  }

  // Handle API errors
  handleError(error) {
    if (error.response) {
      const status = error.response.status;
      let message = 'Weather API error';

      if (status === 401) {
        message = 'Invalid API key';
      } else if (status === 404) {
        message = 'City not found';
      } else if (status === 429) {
        message = 'Rate limit exceeded. Please try again later';
      }

      const err = new Error(message);
      err.status = status;
      return err;
    }

    return error;
  }
}

module.exports = new OpenWeatherService();
