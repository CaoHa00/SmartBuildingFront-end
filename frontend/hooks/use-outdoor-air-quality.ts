import { AirQualityData } from "@/types/outdoor-air-quality";
import { useState, useEffect } from "react";

export const useOutdoorAirQuality = () => {
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );

  useEffect(() => {
    const fetchOutdoorAirQuality = async () => {
      try {
        const response = await fetch(
          "https://air-quality-api.open-meteo.com/v1/air-quality?" +
            "latitude=11.052823666370383&" +
            "longitude=106.6670890531599&" +
            "current=pm2_5,pm10,sulphur_dioxide,nitrogen_dioxide,ozone,carbon_monoxide,us_aqi&" +
            "timezone=Asia/Ho_Chi_Minh"
        );

        if (!response.ok) {
          console.error("Response status:", response.status);
          console.error("Response text:", await response.text());
          throw new Error(
            `Outdoor air quality data fetch failed: ${response.status}`
          );
        }

        const data = await response.json();

        if (!data?.current) {
          throw new Error("Invalid air quality data format");
        }

        const timestamp =
          new Date(data.current.time) ?? new Date().toISOString();

        setAirQualityData({
          time: timestamp,
          pm2_5: data.current.pm2_5 ?? 0,
          pm10: data.current.pm10 ?? 0,
          sulphur_dioxide: data.current.sulphur_dioxide ?? 0,
          nitrogen_dioxide: data.current.nitrogen_dioxide ?? 0,
          ozone: data.current.ozone ?? 0,
          carbon_monoxide: data.current.carbon_monoxide ?? 0,
          us_aqi: data.current.us_aqi ?? 0,
        });
      } catch (error) {
        console.error("Failed to fetch outdoor air quality:", error);
        setAirQualityData(null);
      }
    };

    fetchOutdoorAirQuality();

    const interval = setInterval(fetchOutdoorAirQuality, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    airQualityData: airQualityData,
  };
};
