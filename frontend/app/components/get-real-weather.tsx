"use client";

import { useState, useEffect } from "react";
import WeatherComponent from "./weather-suggestions";
import GaugesComponents from "./gauges";

interface WeatherData {
  time: Date;
  temperature2m: number;
  relativeHumidity2m: number;
  apparentTemperature: number;
  weatherCode: number;
  uvIndex: number;
  dailyMinTemp: number;
  dailyMaxTemp: number;
  hourlyTemp2m: number[];
  hourlyWeatherCode: number[];
  hourlyTime: Date[];
}

async function fetchWeatherData(): Promise<WeatherData | null> {
  try {
    const response = await fetch("/api/weather", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export default function GetRealWeather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function updateWeather() {
      const data = await fetchWeatherData();
      if (data) {
        const hourlyTimeAsDate = (data.hourlyTime as unknown as string[]).map(
          (timestamp) => new Date(timestamp)
        );
        setWeatherData({
          ...data,
          time: new Date(data.time),
          hourlyTime: hourlyTimeAsDate,
        });
      }
    }

    updateWeather();
    const interval = setInterval(updateWeather, 30000);

    return () => clearInterval(interval);
  }, []);
  if (!weatherData) return <p>Loading weather data...</p>;

  return (
    <div className="grid mt-[80px] bg-[#0f4da8] p-2 rounded-xl md:mt-24 grid-cols-2 gap-2 mb-2">
      <WeatherComponent
        temperature={weatherData.temperature2m}
        weatherCode={weatherData.weatherCode}
        dailyMinTemp={weatherData.dailyMinTemp}
        dailyMaxTemp={weatherData.dailyMaxTemp}
        hourlyTemp2m={weatherData.hourlyTemp2m}
        hourlyWeatherCodes={weatherData.hourlyWeatherCode}
        hourlyTime={weatherData.hourlyTime}
      />
      <GaugesComponents
        temperature={weatherData.temperature2m}
        humidity={weatherData.relativeHumidity2m}
        uvIndex={weatherData.uvIndex}
      />
    </div>
  );
}
