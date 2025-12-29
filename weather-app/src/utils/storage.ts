import type { City } from '../types/weather';

const STORAGE_KEY = 'weather_last_city';

export const saveLastCity = (city: City): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(city));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLastCity = (): City | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const clearLastCity = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
