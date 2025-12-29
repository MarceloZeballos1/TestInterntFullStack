import type { CurrentWeather as CurrentWeatherType } from '../types/weather';
import { getWeatherDescription, getWeatherIcon } from '../utils/weatherCodes';
import './CurrentWeather.css';

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

export const CurrentWeather = ({ weather }: CurrentWeatherProps) => {
  return (
    <div className="current-weather">
      <div className="weather-header">
        <h2 className="city-name">{weather.city}</h2>
        <span className="country">{weather.country}</span>
      </div>
      <div className="weather-main">
        <div className="weather-icon">{getWeatherIcon(weather.weatherCode)}</div>
        <div className="temperature">{weather.temperature}°C</div>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Condición</span>
          <span className="detail-value">{getWeatherDescription(weather.weatherCode)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Viento</span>
          <span className="detail-value">{weather.windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};
