import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastList } from './components/ForecastList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { getWeatherData } from './services/weatherService';
import { saveLastCity, getLastCity } from './utils/storage';
import type { WeatherState, City } from './types/weather';
import './App.css';

function App() {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    current: null,
    forecast: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const lastCity = getLastCity();
    if (lastCity) {
      handleSearch(lastCity);
    }
  }, []);

  const handleSearch = async (city: City) => {
    setWeatherState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    try {
      const { current, forecast } = await getWeatherData(
        city.latitude,
        city.longitude
      );

      current.city = city.name;
      current.country = city.country;

      setWeatherState({
        current,
        forecast,
        loading: false,
        error: null,
      });

      saveLastCity(city);
    } catch (error) {
      setWeatherState({
        current: null,
        forecast: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Error al obtener el clima',
      });
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Pronóstico del Tiempo</h1>
        <SearchBar onSearch={handleSearch} isLoading={weatherState.loading} />
      </header>

      <main className="app-content">
        {weatherState.loading && <LoadingSpinner />}

        {weatherState.error && <ErrorMessage message={weatherState.error} />}

        {!weatherState.loading && !weatherState.error && weatherState.current && (
          <>
            <CurrentWeather weather={weatherState.current} />
            {weatherState.forecast.length > 0 && (
              <ForecastList forecast={weatherState.forecast} />
            )}
          </>
        )}

        {!weatherState.loading && !weatherState.error && !weatherState.current && (
          <div className="welcome-message">
            <p>Busca una ciudad para ver el pronóstico del tiempo</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
