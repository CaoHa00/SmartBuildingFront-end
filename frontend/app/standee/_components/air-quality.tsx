"use client";

import { Leaf } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { useState, useEffect } from "react";

interface AirQualityData {
  time: Date;
  pm2_5: number;
  pm10: number;
  sulphur_dioxide: number;
  nitrogen_dioxide: number;
  ozone: number;
  carbon_monoxide: number;
  us_aqi: number;
}

async function fetchAirQuality(): Promise<AirQualityData | null> {
  try {
    const response = await fetch("/api/air-quality", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch air quality data");
    const data = await response.json();

    return {
      ...data,
      time: new Date(data.time),
    };
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    return null;
  }
}

function getAQIColor(aqi: number): string {
  if (aqi <= 50) return "#02f506"; // Green (Healthy)
  if (aqi <= 100) return "#f5e702"; // Yellow (Moderate)
  if (aqi <= 150) return "#f57902"; // Orange (Unhealthy for sensitive groups)
  return "#f50202"; // Red (Unhealthy or worse)
}

function getAQIDescription(aqi: number, isEnglish: boolean): string {
  if (aqi <= 50) return isEnglish ? "Fresh" : "Trong lành";
  if (aqi <= 100) return isEnglish ? "Moderate" : "Trung bình";
  if (aqi <= 150) return isEnglish ? "Unhealthy" : "Không tốt";
  return isEnglish ? "Hazardous" : "Nguy hại";
}

function getPollutantColor(value: number, type: string): string {
  const thresholds: { [key: string]: number[] } = {
    pm2_5: [12, 35.4, 55.4, 150],
    pm10: [54, 154, 254, 354],
    sulphur_dioxide: [20, 75, 185, 304],
    nitrogen_dioxide: [53, 100, 360, 649],
    ozone: [70, 140, 180, 240],
    carbon_monoxide: [4400, 9400, 12400, 15400],
  };

  if (!thresholds[type]) return "#ffffff";

  if (value <= thresholds[type][0]) return "#16c91a"; // Green
  if (value <= thresholds[type][1]) return "#f5e702"; // Yellow
  if (value <= thresholds[type][2]) return "#f57902"; // Orange
  return "#f50202"; // Red
}

const pollutantLabels: { [key: string]: string } = {
  pm2_5: "PM2.5",
  pm10: "PM10",
  sulphur_dioxide: "SO2",
  nitrogen_dioxide: "NO2",
  ozone: "O3",
  carbon_monoxide: "CO",
};

export default function AirQuality() {
  const { isEnglish } = useLanguage();
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(
    null
  );

  useEffect(() => {
    async function updateAirQuality() {
      const data = await fetchAirQuality();
      if (data) setAirQualityData(data);
    }

    updateAirQuality();
    const interval = setInterval(updateAirQuality, 60000);

    return () => clearInterval(interval);
  }, []);
  if (!airQualityData) return <p>Loading Air Quality data...</p>;

  const text = isEnglish
    ? {
        title: "Air Quality",
      }
    : {
        title: "Chất lượng không khí",
      };

  return (
    <div className="bg-[#5e83ba] rounded-xl aspect-auto px-3 py-3">
      <div className="flex justify-center">
        <Leaf fill="#16c91a" color="#16c91a" />
        <h1 className="text-2xl md:text-3xl font-bold leading-none ml-2">
          {text.title}
        </h1>
      </div>
      <div className="w-full text-center mt-1 mb-1 h-24 md:h-40">
        <h1
          className="text-[60px] md:text-[100px] leading-none"
          style={{ color: getAQIColor(airQualityData.us_aqi) }}
        >
          {Math.round(airQualityData.us_aqi * 100) / 100}
        </h1>
        <h1 className="text-4xl md:text-5xl">
          {getAQIDescription(airQualityData.us_aqi, isEnglish)}
        </h1>
      </div>
      <div className="flex justify-between mt-4">
        {(
          [
            "pm2_5",
            "pm10",
            "sulphur_dioxide",
            "nitrogen_dioxide",
            "ozone",
            "carbon_monoxide",
          ] as (keyof Omit<AirQualityData, "time">)[]
        ).map((key) => (
          <div key={key} className="w-full font-bold text-xs md:text-base">
            <p
              className="text-center"
              style={{ color: getPollutantColor(airQualityData[key], key) }}
            >
              {Math.round(airQualityData[key] * 100) / 100}
            </p>
            <p className="text-center">{pollutantLabels[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
