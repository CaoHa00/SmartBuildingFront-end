"use client";
import { Droplet, TriangleAlert, Waves, Thermometer } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export function AirMonitor() {
  const isMobile = useIsMobile();
  const params = useParams();
  const { values, loading: isLoading, getValueByName, fetchEquipmentValues } = useEquipmentValues(params.roomId as string);

  useEffect(() => {
    fetchEquipmentValues();
  }, [fetchEquipmentValues]);

  const humidity = getValueByName("humidity");
  const temperature = getValueByName("temperature");
  const batteryLevel = getValueByName("battery-percentage");

  return (
    <div className="w-full h-full aspect-video relative rounded-xl bg-blue-800 p-2 mx-auto">
      <div className="h-1/3 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300 mb-2">
        <div className="italic tracking-widest text-[10px] md:text-xs font-bold text-center text-white p-1">
          Temperature
        </div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl md:text-3xl text-white pt-4">
          {temperature ?? "N/A"}°C
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Thermometer className="w-4 h-4 md:w-6 md:h-6" />
        </div>
        {batteryLevel !== null && batteryLevel !== undefined && (
          <div className="absolute bottom-1 right-2 text-xs text-white">
            Battery: {batteryLevel}%
          </div>
        )}
      </div>

      <div className="h-1/4 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300 mb-2">
        <div className="italic tracking-widest text-[10px] md:text-xs font-bold text-center text-white p-1">
          Humidity
        </div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl md:text-3xl text-white pt-4">
          {humidity ?? "N/A"} %
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Droplet className="w-4 h-4 md:w-6 md:h-6" />
        </div>
      </div>

      <div className="h-1/3 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300">
        <div className="text-xl md:text-2xl text-center font-bold text-white pt-2">
          700-1000 PPM
        </div>
        <div className="flex items-center justify-between px-4 md:px-8 font-bold text-lg md:text-xl text-white">
          <p>CO</p>
          <TriangleAlert className="w-4 h-4 md:w-5 md:h-5" />
          <p>CO₂</p>
        </div>
      </div>
    </div>
  );
}
