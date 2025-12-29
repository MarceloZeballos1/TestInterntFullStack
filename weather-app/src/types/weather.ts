export interface City {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
}

export interface WeatherState {
  current: CurrentWeather | null;
  forecast: DailyForecast[];
  loading: boolean;
  error: string | null;
}
