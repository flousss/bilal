# Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from OpenWeatherMap API. View current conditions, forecasts, and multiple locations.

## Features

✅ **Real-time Weather Data** - Current conditions, temperature, humidity, wind speed  
✅ **5-Day Forecast** - Detailed weather predictions  
✅ **Multiple Locations** - Search and save favorite cities  
✅ **Weather Alerts** - Get notified of severe weather  
✅ **Responsive Design** - Works on all devices  
✅ **Location Services** - Auto-detect user's location  
✅ **Unit Toggle** - Switch between Celsius and Fahrenheit  
✅ **Beautiful UI** - Weather icons and animations  
✅ **Persistent Storage** - Save preferences locally  

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Axios
- React Icons
- Vite

### Backend
- Node.js
- Express.js
- OpenWeatherMap API
- Redis (optional caching)

## Prerequisites

- Node.js 16+
- Free OpenWeatherMap API Key (get it from https://openweathermap.org/api)

## Quick Start

### 1. Get API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free
3. Copy your API key from the dashboard

### 2. Setup Backend

```bash
cd backend
npm install

# Create .env file
echo 'OPENWEATHER_API_KEY=your_api_key_here' > .env
echo 'PORT=5000' >> .env
echo 'NODE_ENV=development' >> .env

# Start server
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install

# Create .env file
echo 'VITE_API_URL=http://localhost:5000/api' > .env

# Start dev server
npm run dev
```

Visit `http://localhost:5173`

### 4. Using Docker

```bash
docker-compose up -d
```

Services will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## API Endpoints

### Weather Endpoints

**Get Current Weather**
```
GET /api/weather/current?city=London&units=metric
```

Response:
```json
{
  "city": "London",
  "country": "GB",
  "temp": 15,
  "feels_like": 14,
  "humidity": 72,
  "pressure": 1013,
  "wind_speed": 3.5,
  "description": "Partly cloudy",
  "icon": "02d",
  "uvi": 4.5,
  "visibility": 10000
}
```

**Get 5-Day Forecast**
```
GET /api/weather/forecast?city=London&units=metric
```

**Get Multiple Cities**
```
GET /api/weather/cities?cities=London,Paris,Tokyo&units=metric
```

**Get Geolocation Weather**
```
GET /api/weather/geo?lat=51.5074&lon=-0.1278&units=metric
```

**Search Cities**
```
GET /api/weather/search?q=Lon
```

## Environment Variables

### Backend (.env)
```
OPENWEATHER_API_KEY=your_api_key
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
CACHE_ENABLED=true
CACHE_TTL=600
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
weather-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CurrentWeather.jsx
│   │   │   ├── Forecast.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── LocationList.jsx
│   │   │   └── Settings.jsx
│   │   ├── services/
│   │   │   └── weatherApi.js
│   │   ├── hooks/
│   │   │   ├── useWeather.js
│   │   │   └── useGeolocation.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── routes/
│   │   └── weather.js
│   ├── controllers/
│   │   └── weatherController.js
│   ├── services/
│   │   └── openWeatherService.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
└── README.md
```

## Usage

### Search Weather by City
1. Enter city name in search bar
2. Select from suggestions
3. View current weather and forecast

### View Multiple Locations
1. Add cities to favorites
2. Toggle between locations
3. Compare weather conditions

### Change Units
1. Click settings icon
2. Toggle between Celsius/Fahrenheit
3. Preference saves automatically

### Enable Location Services
1. Click location icon
2. Allow browser permission
3. Auto-loads your local weather

## Features Detailed

### Current Weather Display
- Temperature and "feels like" temperature
- Weather condition with icon
- Humidity and pressure
- Wind speed and direction
- UV index
- Visibility distance

### 5-Day Forecast
- Daily high/low temperatures
- Weather icons
- Precipitation probability
- Wind information
- Hourly breakdown

### Search & Favorites
- Real-time city search
- Add/remove favorites
- Quick access to saved cities
- Search history

### Responsive Design
- Mobile-first approach
- Adapts to tablet and desktop
- Touch-friendly interface
- Fast loading times

## Performance

- **Caching**: Backend caches API calls (configurable TTL)
- **Lazy Loading**: Components load on demand
- **Image Optimization**: Weather icons optimized
- **API Rate Limiting**: Respects OpenWeatherMap limits

## Error Handling

- Network error recovery
- API rate limit handling
- Graceful fallbacks
- User-friendly error messages

## Development

### Running Tests
```bash
cd backend
npm test
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

## Deployment

### Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Heroku (Backend)
```bash
heroku create
git push heroku main
```

## API Key Considerations

- **Free Plan**: 60 calls/minute, 1,000,000 calls/month
- **Backend Proxy**: Store API key on backend, not in frontend
- **Caching**: Reduce API calls with response caching
- **Rate Limiting**: Implement on backend

## Weather Data Accuracy

Data provided by [OpenWeatherMap](https://openweathermap.org/)
- Weather conditions
- Temperature forecasts
- Precipitation data
- Wind information
- UV index

## Troubleshooting

### "API Key Invalid"
- Check API key in .env file
- Ensure key is activated on OpenWeatherMap
- Check for typos

### "City Not Found"
- Verify city spelling
- Try with country code (e.g., "London, GB")
- Check API response

### "Rate Limit Exceeded"
- Wait a few minutes
- Implement caching
- Upgrade API plan

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review [OpenWeatherMap docs](https://openweathermap.org/api)
3. Create an issue on GitHub

---

**Created with ❤️ using React, Node.js, and OpenWeatherMap API**
