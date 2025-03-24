"use client";
import { Droplet, TriangleAlert, Waves } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AirQualityResponse } from "@/types/air-quality";

async function fetchAirQuality() {
  const { data } = await axios.post<AirQualityResponse>(
    "http://10.60.253.172:9090/api/aqara/query-temperature"
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["airQuality"],
    queryFn: fetchAirQuality,
    refetchInterval: 30000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="aspect-video relative rounded-xl bg-muted/50 h-[430px] w-[510px]">
      <div className="h-1/3 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300 mx-2 my-2">
        <div className="italic tracking-widest text-xs font-bold text-center text-white p-1">
          Humidity
        </div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-3xl text-white standee:text-4xl pt-4">
          {data?.humidity ?? "N/A"} %
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Droplet />
        </div>
      </div>
      <div className="h-1/3 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300 mx-2 my-2">
        <div className="italic tracking-widest text-xs font-bold text-center text-white p-1">
          Temperature
        </div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-3xl text-white standee:text-4xl pt-4">
          {data?.temperature ?? "N/A"}°C
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Waves />
        </div>
      </div>
      <div className="h-1/4 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300 mx-2 my-2">
        <div className="text-2xl text-center font-bold text-white standee:text-3xl pt-2">
          700-1000 PPM
        </div>
        <div className="flex items-center justify-between px-8 font-bold text-2xl text-white standee:text-3xl">
          <p>CO</p>
          <TriangleAlert size={30} className="standee:w-12 standee:h-12" />
          <p>CO₂</p>
        </div>
        <div className="text-[12px] text-center  font-bold text-white/80 italic absolute bottom-1 w-full">
          Last update:{" "}
          {data?.timeStamp ? formatTimeUTC7(data.timeStamp) : "N/A"}
        </div>
      </div>
    </div>
  );
}
