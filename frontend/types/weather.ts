export interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    precipitation: number;
    time: bigint;
    uv_index: number;
  };
  daily: {
    temperature_2m_min: number;
    temperature_2m_max: number;
  };
  hourly: {
    temperature_2m: number[];
    weather_code: number[];
    time: bigint;
    time_end: bigint;
    interval: number;
  };
}

export interface WeatherNews {
  title: string;
  description: string;
  severity: "info" | "warning" | "alert";
  time: string;
}

export interface AdminWeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  precipitation: number;
  location: string;
  news: WeatherNews[];
  timestamp: Date;
  isDaytime: boolean;
}

export interface StandeeWeatherData {
  time: Date;
  currentTemperature: number;
  currentHumidity: number;
  currentWeatherCode: number;
  currentUvIndex: number;
  dailyMinTemp: number;
  dailyMaxTemp: number;
  hourlyTemp: number[];
  hourlyWeatherCode: number[];
  hourlyTime: Date[];
}

export interface WeatherComponentProps {
  temperature: number;
  weatherCode: number;
  dailyMinTemp: number;
  dailyMaxTemp: number;
  hourlyTemp2m: number[];
  hourlyWeatherCodes: number[];
  hourlyTime: Date[];
}
