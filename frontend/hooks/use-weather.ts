import { useState, useEffect } from "react";
import {
  WeatherResponse,
  AdminWeatherData,
  WeatherNews,
  StandeeWeatherData,
} from "../types/weather";

const getWeatherCondition = (code: number): string => {
  if (code <= 1) return "Sunny";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  return "Thunderstorm";
};

const isDaytime = (timestamp: Date): boolean => {
  const hour = timestamp.getHours();
  return hour >= 6 && hour < 18;
};

const mockWeatherNews = [
  {
    title: "High Temperature Alert",
    description: "Temperatures expected to reach 35°C today. Stay hydrated.",
    severity: "warning",
    time: "2 hours ago",
  },
  {
    title: "Weather Forecast Update",
    description: "Clear skies expected for the next 24 hours.",
    severity: "info",
    time: "4 hours ago",
  },
] as WeatherNews[];

export const useWeather = () => {
  const [adminWeather, setAdminWeather] = useState<AdminWeatherData | null>(
    null
  );
  const [standeeWeather, setStandeeWeather] =
    useState<StandeeWeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?" +
            "latitude=11.052823666370383&" +
            "longitude=106.6670890531599&" +
            "current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,apparent_temperature,weather_code,uv_index&" +
            "daily=temperature_2m_min,temperature_2m_max&" +
            "hourly=temperature_2m,weather_code&" +
            "timezone=Asia/Ho_Chi_Minh"
        );

        if (!response.ok) {
          console.error("Response status:", response.status);
          console.error("Response text:", await response.text());
          throw new Error(`Weather data fetch failed: ${response.status}`);
        }

        const data = await response.json();

        if (!data?.current) {
          throw new Error("Invalid weather data format");
        }

        const timestamp =
          new Date(data.current.time) ?? new Date().toISOString();

        setAdminWeather({
          temperature: Math.round(data.current.temperature_2m ?? 0),
          humidity: Math.round(data.current.relative_humidity_2m ?? 0),
          condition: getWeatherCondition(data.current.weather_code ?? 0),
          windSpeed: Math.round(data.current.wind_speed_10m ?? 0),
          precipitation: data.current.precipitation ?? 0,
          location: "EIU, Binh Duong",
          news: mockWeatherNews,
          timestamp: timestamp,
          isDaytime: isDaytime(timestamp),
        });

        setStandeeWeather({
          time: timestamp,
          currentTemperature: data.current.temperature_2m ?? 0,
          currentHumidity: data.current.relative_humidity_2m ?? 0,
          currentWeatherCode: data.current.weather_code ?? 0,
          currentUvIndex: data.current.uv_index ?? 0,
          dailyMaxTemp: data.daily.temperature_2m_max?.[0] ?? 0,
          dailyMinTemp: data.daily.temperature_2m_min?.[0] ?? 0,
          hourlyTemp: data.hourly.temperature_2m ?? [],
          hourlyWeatherCode: data.hourly.weather_code ?? [],
          hourlyTime: data.hourly.time.map((t: string) => new Date(t)),
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setAdminWeather(null);
        setStandeeWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    adminWeather: adminWeather,
    standeeWeather: standeeWeather,
    loading,
  };
};
