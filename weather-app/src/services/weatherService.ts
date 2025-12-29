import type { City, CurrentWeather, DailyForecast } from '../types/weather';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const searchCity = async (cityName: string): Promise<City[]> => {
  const response = await fetch(
    `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=5&language=es&format=json`
  );

  if (!response.ok) {
    throw new Error('Error al buscar la ciudad');
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('Ciudad no encontrada');
  }

  return data.results.map((result: any) => ({
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
  }));
};

export const getWeatherData = async (
  latitude: number,
  longitude: number
): Promise<{ current: CurrentWeather; forecast: DailyForecast[] }> => {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
  });

  const response = await fetch(`${WEATHER_API}?${params}`);

  if (!response.ok) {
    throw new Error('Error al obtener datos del clima');
  }

  const data = await response.json();

  const current: CurrentWeather = {
    city: '',
    country: '',
    temperature: Math.round(data.current.temperature_2m),
    windSpeed: Math.round(data.current.wind_speed_10m),
    weatherCode: data.current.weather_code,
  };

  const forecast: DailyForecast[] = data.daily.time.slice(0, 7).map((date: string, index: number) => ({
    date,
    maxTemp: Math.round(data.daily.temperature_2m_max[index]),
    minTemp: Math.round(data.daily.temperature_2m_min[index]),
    weatherCode: data.daily.weather_code[index],
  }));

  return { current, forecast };
};
