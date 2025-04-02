import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 11.0542,
  longitude: 106.6667,
  current: [
    "pm2_5",
    "pm10",
    "sulphur_dioxide",
    "nitrogen_dioxide",
    "ozone",
    "carbon_monoxide",
    "us_aqi",
  ],
  timezone: "Asia/Bangkok",
};

export async function fetchAirQualityData() {
  try {
    const url = "https://air-quality-api.open-meteo.com/v1/air-quality";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];
    const current = response.current();

    if (!current) {
      console.error("Failed to fetch air quality data.");
      return null;
    }

    return {
      time: new Date(Number(current.time()) * 1000), // Ensure Date conversion
      pm2_5: current.variables(0)!.value(),
      pm10: current.variables(1)!.value(),
      sulphur_dioxide: current.variables(2)!.value(),
      nitrogen_dioxide: current.variables(3)!.value(),
      ozone: current.variables(4)!.value(),
      carbon_monoxide: current.variables(5)!.value(),
      us_aqi: current.variables(6)!.value(),
    };
  } catch (error) {
    console.error("Air Quality API Error:", error);
    return null;
  }
}
