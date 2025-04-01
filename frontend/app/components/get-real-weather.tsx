"use client";

import { fetchWeatherApi } from "openmeteo";
import { useState, useEffect } from "react";
import WeatherComponent from "./weather-suggestions";
import GaugesComponents from "./gauges";

const params = {
  latitude: 11.0542,
  longitude: 106.6667,
  daily: ["temperature_2m_min", "temperature_2m_max"],
  current: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "weather_code",
    "uv_index",
  ],
  hourly: ["temperature_2m", "weather_code"],
  timezone: "Asia/Bangkok",
  forecast_days: 1,
};

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
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  const response = responses[0];
  const current = response.current();
  const daily = response.daily();
  const hourly = response.hourly();

  if (!current || !daily || !hourly) {
    console.error("Failed to fetch weather data.");
    return null;
  }

  try {
    return {
      time: new Date(Number(current.time()) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      weatherCode: current.variables(3)!.value(),
      uvIndex: current.variables(4)!.value(),
      dailyMinTemp: daily.variables(0)!.valuesArray()![0],
      dailyMaxTemp: daily.variables(1)!.valuesArray()![0],
      hourlyTemp2m: Array.from(hourly.variables(0)!.valuesArray()!),
      hourlyWeatherCode: Array.from(hourly.variables(1)!.valuesArray()!),
      hourlyTime: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date(t * 1000)),
    };
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
      if (data) setWeatherData(data);
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
