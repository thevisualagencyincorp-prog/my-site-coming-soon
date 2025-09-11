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

  if (!weather) {
    return (
      <span className="inline-flex items-center gap-1 text-white/90">
        <span className="w-3 h-3 inline-block rounded-full bg-white/40 animate-pulse" />
        <span className="text-xs">Locating…</span>
      </span>
    );
  }

  const tempFahrenheit = Math.round((weather.temperature * 9) / 5 + 32);
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`;

  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/10 border border-white/10"
      title={`${weather.description} · ${weather.location}`}
    >
      <img
        src={iconUrl}
        alt={weather.description}
        className="w-4 h-4"
        style={{ imageRendering: "pixelated" }}
      />
      <span className="font-mono text-xs">{tempFahrenheit}°F</span>
    </span>
  );
}
