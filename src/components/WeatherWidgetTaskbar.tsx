"use client";
import { useState, useEffect } from "react";
import { WeatherData } from "@/types";
import { useGeolocation } from "@/hooks/useGeolocation";
import { fetchWeatherData, getMockWeatherData } from "@/lib/weather";
export function WeatherWidgetTaskbar() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const geolocation = useGeolocation();
  useEffect(() => {
    if (geolocation.location) {
      fetchWeatherData(geolocation.location)
        .then(setWeather)
        .catch(() => setWeather(getMockWeatherData()));
    }
  }, [geolocation.location]);
  if (!weather) return <span>--°C</span>;
  return (
    <span>
      <span>{weather.temperature}°C</span>
    </span>
  );
}
