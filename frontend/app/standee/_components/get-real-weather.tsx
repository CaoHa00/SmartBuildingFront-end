"use client";

import { Card, CardContent } from "@/components/ui/card";
import WeatherComponent from "./weather-suggestions";
import GaugesComponents from "./gauges";
import { useWeather } from "@/hooks/use-weather";

export default function GetRealWeather() {
  const { standeeWeather } = useWeather();

  if (!standeeWeather) {
    return (
      <Card className="w-[350px]">
        <CardContent>
          <p className="text-destructive">Failed to load weather data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid mt-[80px] bg-[#0f4da8] p-2 rounded-xl md:mt-24 grid-cols-2 gap-2 mb-2">
      <WeatherComponent
        temperature={standeeWeather.currentTemperature}
        weatherCode={standeeWeather.currentWeatherCode}
        dailyMinTemp={standeeWeather.dailyMinTemp}
        dailyMaxTemp={standeeWeather.dailyMaxTemp}
        hourlyTemp2m={standeeWeather.hourlyTemp}
        hourlyWeatherCodes={standeeWeather.hourlyWeatherCode}
        hourlyTime={standeeWeather.hourlyTime}
      />
      <GaugesComponents
        temperature={standeeWeather.currentTemperature}
        humidity={standeeWeather.currentHumidity}
        uvIndex={standeeWeather.currentUvIndex}
      />
    </div>
  );
}
