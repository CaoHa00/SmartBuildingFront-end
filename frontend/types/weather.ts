export interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    precipitation: number;
    time: string;
  };
}

export interface WeatherNews {
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'alert';
  time: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  precipitation: number;
  location: string;
  news: WeatherNews[];
  timestamp: string;
  isDaytime: boolean;
}
