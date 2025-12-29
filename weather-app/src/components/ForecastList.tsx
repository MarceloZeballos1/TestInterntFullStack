import type { DailyForecast } from '../types/weather';
import { getWeatherDescription, getWeatherIcon } from '../utils/weatherCodes';
import './ForecastList.css';

interface ForecastListProps {
  forecast: DailyForecast[];
}

export const ForecastList = ({ forecast }: ForecastListProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    }).format(date);
  };

  return (
    <div className="forecast-list">
      <h3 className="forecast-title">Pronóstico de 7 días</h3>
      <div className="forecast-grid">
        {forecast.map((day) => (
          <div key={day.date} className="forecast-card">
            <div className="forecast-date">{formatDate(day.date)}</div>
            <div className="forecast-icon">{getWeatherIcon(day.weatherCode)}</div>
            <div className="forecast-description">{getWeatherDescription(day.weatherCode)}</div>
            <div className="forecast-temps">
              <span className="temp-max">{day.maxTemp}°</span>
              <span className="temp-separator">/</span>
              <span className="temp-min">{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
