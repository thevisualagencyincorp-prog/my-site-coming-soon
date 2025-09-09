import { WeatherData, LocationData } from '@/types';

// Using OpenWeatherMap API - replace with your own API key
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherData(location: LocationData): Promise<WeatherData> {
  try {
    const url = `${BASE_URL}?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      location: data.name,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return mock data for demo purposes
    return {
      temperature: 22,
      description: 'partly cloudy',
      location: 'Demo Location',
      humidity: 65,
      windSpeed: 5.2,
      icon: '02d'
    };
  }
}

// Mock weather data for development/demo
export function getMockWeatherData(): WeatherData {
  return {
    temperature: 22,
    description: 'partly cloudy',
    location: 'Demo Location',
    humidity: 65,
    windSpeed: 5.2,
    icon: '02d'
  };
}