"use client";
import { Droplet, TriangleAlert, Waves } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AirQualityResponse } from "@/types/air-quality";
import { useIsMobile } from "@/hooks/use-mobile";
import { useElectricityData } from "@/hooks/useElectricityData";

async function fetchAirQuality() {
  
  const { data } = await axios.post<AirQualityResponse>(
    `http://10.60.253.172:9090/api/aqara/currentValue?equipmentId=10018`,
  );
  return data;
}

function formatTimeUTC7(timestamp: string) {
  const date = new Date(Number(timestamp));
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Bangkok", // UTC+7
    hour12: false,
  };
  return date.toLocaleTimeString("en-US", options);
}

export function AirMonitor() {
  const isMobile = useIsMobile();
  const { data, isLoading, error } = useQuery({
    queryKey: ["airQuality"],
    queryFn: fetchAirQuality,
    refetchInterval: 30000,
  });
  
  const { data: electricityData } = useElectricityData();
  
  // Calculate CO2 emissions (kg) from forward energy power
  const co2Emissions = electricityData?.forward_energy_power 
    ? (electricityData.forward_energy_power * 0.5).toFixed(2) 
    : null;
    
  // Calculate CO emissions (kg) - approximately 0.1% of CO2
  const coEmissions = co2Emissions 
    ? (Number(co2Emissions) * 0.001).toFixed(3)
    : null;

  return (
    <div className="w-full h-full aspect-video relative rounded-xl bg-muted/50 p-2 mx-auto">
      <div className="h-1/4 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300 mb-2">
        <div className="italic tracking-widest text-[10px] md:text-xs font-bold text-center text-white p-1">
          Humidity
        </div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl md:text-3xl text-white pt-4">
          {data?.humidity ?? "N/A"} %
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Droplet className="w-4 h-4 md:w-6 md:h-6" />
        </div>
      </div>
      <div className="h-1/3 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300 mb-2">
        <div className="italic tracking-widest text-[10px] md:text-xs font-bold text-center text-white p-1">
          Temperature
        </div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl md:text-3xl text-white pt-4">
          {data?.temperature ?? "N/A"}°C
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Waves className="w-4 h-4 md:w-6 md:h-6" />
        </div>
      </div>
      <div className="h-1/3 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300">
        <div className="text-xl md:text-2xl text-center font-bold text-white pt-2">
          {coEmissions ?? 'N/A'} - {co2Emissions ?? 'N/A'} kg
        </div>
        <div className="flex items-center justify-between px-4 md:px-8 font-bold text-lg md:text-xl text-white">
          <p>CO</p>
          <TriangleAlert className="w-4 h-4 md:w-5 md:h-5" />
          <p>CO₂</p>
        </div>
        <div className="text-[10px] md:text-[12px] text-center font-bold text-white/80 italic absolute bottom-1 w-full">
          Last update: {data?.timeStamp ? formatTimeUTC7(data.timeStamp) : "N/A"}
        </div>
      </div>
    </div>
  );
}
