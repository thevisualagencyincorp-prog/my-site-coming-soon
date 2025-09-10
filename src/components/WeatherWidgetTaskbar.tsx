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
  if (!weather) return <span>--°F</span>;
  const tempFahrenheit = Math.round((weather.temperature * 9) / 5 + 32);
  return (
    <span>
      <span>{tempFahrenheit}°F</span>
    </span>
  );
}
