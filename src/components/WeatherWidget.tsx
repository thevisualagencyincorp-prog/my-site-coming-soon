'use client';

import { useState, useEffect } from 'react';
import { WeatherData } from '@/types';
import { useGeolocation } from '@/hooks/useGeolocation';
import { fetchWeatherData, getMockWeatherData } from '@/lib/weather';

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const geolocation = useGeolocation();

  // Fetch weather when location is available
  useEffect(() => {
    if (geolocation.location) {
      setLoading(true);
      fetchWeatherData(geolocation.location)
        .then(setWeather)
        .catch(() => setWeather(getMockWeatherData()))
        .finally(() => setLoading(false));
    }
  }, [geolocation.location]);

  // Auto-refresh weather every 10 minutes
  useEffect(() => {
    if (geolocation.location && weather) {
      const interval = setInterval(() => {
        fetchWeatherData(geolocation.location!)
          .then(setWeather)
          .catch(console.error);
      }, 10 * 60 * 1000); // 10 minutes
      
      return () => clearInterval(interval);
    }
  }, [geolocation.location, weather]);

  const handleLocationRequest = () => {
    geolocation.requestLocation();
  };

  if (geolocation.permission === 'denied') {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
        <div className="text-white/90 mb-4">
          <div className="text-4xl mb-2">📍</div>
          <p className="text-sm">Location access denied</p>
          <p className="text-xs text-white/70 mt-2">
            Enable location in browser settings to see local weather
          </p>
        </div>
        <div className="text-white/80">
          <div className="text-2xl font-bold">22°C</div>
          <div className="text-sm">Demo Weather</div>
        </div>
      </div>
    );
  }

  if (!geolocation.location) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
        <div className="text-white/90 mb-4">
          <div className="text-4xl mb-2">🌤️</div>
          <p className="text-sm mb-3">Get local weather</p>
          <button
            onClick={handleLocationRequest}
            disabled={geolocation.loading}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            {geolocation.loading ? 'Getting location...' : 'Allow Location'}
          </button>
          {geolocation.error && (
            <p className="text-xs text-red-300 mt-2">{geolocation.error}</p>
          )}
        </div>
      </div>
    );
  }

  if (loading || !weather) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
        <div className="animate-pulse">
          <div className="text-4xl mb-2">🌤️</div>
          <div className="text-white/90">Loading weather...</div>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (icon: string) => {
    const iconMap: Record<string, string> = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '🌨️', '13n': '🌨️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[icon] || '🌤️';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
      <div className="text-white">
        <div className="text-4xl mb-2">{getWeatherIcon(weather.icon)}</div>
        <div className="text-3xl font-bold mb-1">{weather.temperature}°C</div>
        <div className="text-sm text-white/90 capitalize mb-2">{weather.description}</div>
        <div className="text-xs text-white/70">{weather.location}</div>
        <div className="flex justify-between mt-3 pt-3 border-t border-white/20 text-xs text-white/70">
          <span>💧 {weather.humidity}%</span>
          <span>💨 {weather.windSpeed} m/s</span>
        </div>
      </div>
    </div>
  );
}