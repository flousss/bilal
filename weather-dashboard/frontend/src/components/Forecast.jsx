const Forecast = ({ forecast, units }) => {
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

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-30">
      <h3 className="text-white text-2xl font-bold mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.days.map((day, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 rounded-lg p-4 text-center hover:bg-opacity-20 transition-all cursor-pointer border border-white border-opacity-20"
          >
            <p className="text-white font-semibold mb-2">{day.day}</p>
            <p className="text-gray-300 text-sm mb-3">{day.date}</p>
            <div className="text-4xl mb-3 text-center">{getWeatherIcon(day.icon)}</div>
            <p className="text-white text-sm mb-2 capitalize">{day.description}</p>
            <div className="flex justify-center gap-2">
              <span className="text-white font-semibold">{day.temp_max}{tempUnit}</span>
              <span className="text-gray-300">{day.temp_min}{tempUnit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
