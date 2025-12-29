import { useState, useEffect, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { searchCity } from '../services/weatherService';
import type { City } from '../types/weather';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (city: City) => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        const cities = await searchCity(query);
        setSuggestions(cities);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectCity = (city: City) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelectCity(suggestions[0]);
    }
  };

  return (
    <div className="search-bar-container" ref={searchBarRef}>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar ciudad..."
          className="search-input"
          disabled={isLoading}
          autoComplete="off"
        />
        <button type="submit" className="search-button" disabled={isLoading || !query.trim()}>
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city, index) => (
            <li
              key={`${city.latitude}-${city.longitude}-${index}`}
              className="suggestion-item"
              onClick={() => handleSelectCity(city)}
            >
              <span className="suggestion-name">{city.name}</span>
              <span className="suggestion-country">{city.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
