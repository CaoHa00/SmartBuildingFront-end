"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AirVent, Lightbulb, Tv, Thermometer, Droplets } from "lucide-react";
import { useEffect, useState } from "react";
import { useEquipmentValues } from "@/hooks/use-equipment-values";

interface RoomCardProps {
  roomId: string;
  roomName: string;
  status: "available" | "occupied";
  temperature: number;
  humidity: number;
  id: string;
  devices: {
    ac: boolean;
    light: boolean;
    tv: boolean;
  };
}

export function RoomCard({
  roomId,
  roomName,
}: RoomCardProps) {
  const { values, loading } = useEquipmentValues(roomId);
  const [deviceStatuses, setDeviceStatuses] = useState({
    ac: false,
    light: false,
    tv: false
  });

  // Get temperature and humidity from sensor values
  const temperature = values?.find(v => v.valueName === 'temperature')?.valueResponse ?? 0;
  const humidity = values?.find(v => v.valueName === 'humidity')?.valueResponse ?? 0;
  
  // Determine room status based on light-status value
  const lightStatus = values?.find(v => v.valueName === 'light-status')?.valueResponse ?? 0;
  const roomStatus = lightStatus === 0 ? "available" : "occupied";

  useEffect(() => {
    if (!loading && values) {
      setDeviceStatuses({
        ac: values.some(v => v.equipmentName?.toLowerCase().includes('ac') && v.valueResponse === 1),
        light: values.some(v => v.valueName === 'light-status' && v.valueResponse === 1),
        tv: values.some(v => v.equipmentName?.toLowerCase().includes('tv') && v.valueResponse === 1)
      });
    }
  }, [values, loading]);

  // Status colors
  const getStatusStyles = (status: "available" | "occupied") => {
    if (status === "available") {
      return "bg-green-100 text-green-700 border-green-300";
    }
    return "bg-red-100 text-red-700 border-red-300";
  };

  // Temperature color indicators
  const getTempColor = (temp: number) => {
    if (temp >= 28) return "text-red-500";
    if (temp <= 20) return "text-blue-500";
    return "text-green-500";
  };

  // Humidity color indicators
  const getHumidityColor = (hum: number) => {
    if (hum >= 70) return "text-blue-500";
    if (hum <= 30) return "text-yellow-500";
    return "text-green-500";
  };

  const deviceIconClass = "w-4 h-4 md:w-5 md:h-5 transition-colors duration-200";

  return (
    <Card className="aspect-[4/5] w-full bg-white hover:shadow-lg transition-all duration-200">
      <div className={`h-1 w-full ${roomStatus === "available" ? "bg-green-500" : "bg-red-500"}`} />
      
      <div className="p-4 h-[calc(100%-4px)] flex flex-col">
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="font-semibold text-base md:text-lg text-gray-800 mb-2 truncate">
            {roomName}
          </h3>
          <Badge className={`px-2 py-0.5 text-xs rounded-full ${getStatusStyles(roomStatus)} capitalize`}>
            {roomStatus}
          </Badge>
        </div>

        {/* Environmental Data */}
        <div className="flex-1 grid grid-cols-2 gap-3 mb-4">
          <div className="flex flex-col items-center p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors">
            {loading ? (
              <div className="text-sm text-gray-400">Loading...</div>
            ) : (
              <>
                <Thermometer className={`mb-1 w-5 h-5 ${getTempColor(temperature)}`} />
                <span className={`text-sm font-medium ${getTempColor(temperature)}`}>
                  {temperature.toFixed(1)}°C
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col items-center p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors">
            {loading ? (
              <div className="text-sm text-gray-400">Loading...</div>
            ) : (
              <>
                <Droplets className={`mb-1 w-5 h-5 ${getHumidityColor(humidity)}`} />
                <span className={`text-sm font-medium ${getHumidityColor(humidity)}`}>
                  {humidity.toFixed(1)}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Devices */}
        <div className="mt-auto pt-3 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 font-medium mb-2 text-center">
            Connected Devices
          </p>
          <div className="flex justify-center gap-4">
            {loading ? (
              <div className="text-xs text-gray-400">Loading...</div>
            ) : (
              <>
                <AirVent className={`${deviceIconClass} ${deviceStatuses.ac ? "text-blue-600" : "text-gray-300"}`} />
                <Lightbulb className={`${deviceIconClass} ${deviceStatuses.light ? "text-yellow-500" : "text-gray-300"}`} />
                <Tv className={`${deviceIconClass} ${deviceStatuses.tv ? "text-purple-500" : "text-gray-300"}`} />
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
