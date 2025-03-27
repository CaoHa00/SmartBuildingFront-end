"use client";

import { fetchWeatherApi } from "openmeteo";
import { useState, useEffect } from "react";
import WeatherComponent from "./weather-suggestions";
import GaugesComponents from "./gauges";

const params = {
  latitude: 10.823,
  longitude: 106.6296,
  daily: ["temperature_2m_min", "temperature_2m_max", "sunrise", "sunset"],
  current: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "weather_code",
    "uv_index",
  ],
  timezone: "Asia/Bangkok",
  forecast_days: 1,
  cell_selection: "nearest",
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
  sunrise: string;
  sunset: string;
}

async function fetchWeatherData(): Promise<WeatherData | null> {
  const currentUrl = "https://api.open-meteo.com/v1/forecast";
  const dailyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&daily=temperature_2m_min,temperature_2m_max,sunrise,sunset&timezone=${params.timezone}&forecast_days=1`;
  const responses = await fetchWeatherApi(currentUrl, params);

  const response = responses[0];
  const current = response.current();

  if (!current) {
    console.error("Failed to fetch current weather data.");
    return null;
  }

  try {
    const response = await fetch(dailyUrl);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();

    console.log("API Response:", data);

    const formatTime = (isoString: string) => isoString.split("T")[1] ?? "N/A";

    return {
      time: new Date(Number(current.time()) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      weatherCode: current.variables(3)!.value(),
      uvIndex: current.variables(4)!.value(),
      dailyMinTemp: data.daily.temperature_2m_min[0] ?? 0,
      dailyMaxTemp: data.daily.temperature_2m_max[0] ?? 0,
      sunrise: formatTime(data.daily.sunrise[0]),
      sunset: formatTime(data.daily.sunset[0]),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }

  // const formatTime = (isoString: string) => isoString.split("T")[1] ?? "N/A";

  // console.log("Daily response:", daily);
  // console.log("Sunrise:", daily.variables(2)?.valuesArray());
  // console.log("Sunset:", daily.variables(3)?.valuesArray());

  // const getDailyVariable = (index: number) => {
  //   const variable = daily.variables(index);
  //   return variable && variable.valuesArray()
  //     ? variable.valuesArray()![0]
  //     : null;
  // };

  // return {
  //   time: new Date(Number(current.time()) * 1000),
  //   temperature2m: current.variables(0)!.value(),
  //   relativeHumidity2m: current.variables(1)!.value(),
  //   apparentTemperature: current.variables(2)!.value(),
  //   weatherCode: current.variables(3)!.value(),
  //   uvIndex: current.variables(4)!.value(),
  //   dailyMinTemp: getDailyVariable(0) ?? 0,
  //   dailyMaxTemp: getDailyVariable(1) ?? 0,
  //   sunrise: formatTime(sunrise),
  //   sunset: formatTime(sunset),
  // };
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
    <div className="grid mt-[80px] md:mt-24 grid-cols-2 gap-2 mb-2">
      <WeatherComponent
        temperature={weatherData.temperature2m}
        weatherCode={weatherData.weatherCode}
        dailyMinTemp={weatherData.dailyMinTemp}
        dailyMaxTemp={weatherData.dailyMaxTemp}
      />
      <GaugesComponents
        temperature={weatherData.temperature2m}
        humidity={weatherData.relativeHumidity2m}
        uvIndex={weatherData.uvIndex}
        sunrise={weatherData.sunrise}
        sunset={weatherData.sunset}
      />
    </div>
  );
}
