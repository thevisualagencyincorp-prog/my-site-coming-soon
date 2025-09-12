export interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  // Unix timestamps (seconds since epoch) for sunrise/sunset and timezone offset in seconds
  sunrise?: number;
  sunset?: number;
  timezoneOffset?: number;
}

export interface LocationData {
  latitude: number;
  longitude: number;
}

export interface GeolocationState {
  loading: boolean;
  error: string | null;
  location: LocationData | null;
  permission: "granted" | "denied" | "prompt" | null;
}

export interface TimeData {
  time: string;
  date: string;
  timezone: string;
}
