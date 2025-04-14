import { fetchWeatherApi } from "openmeteo";

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

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export async function fetchWeatherData() {
  try {
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    if (!response) throw new Error("Failed to fetch weather data");

    const current = response.current();
    const daily = response.daily();
    const hourly = response.hourly();

    if (!current || !daily || !hourly) {
      console.error("Missing weather data from Open-Meteo API");
      return null;
    }

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
    console.error("Weather API Error:", error);
    return null;
  }
}
