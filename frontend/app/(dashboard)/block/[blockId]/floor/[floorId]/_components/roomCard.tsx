import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AirVent, Lightbulb, Tv, Thermometer, Droplets } from "lucide-react";

interface RoomCardProps {
  roomName: string;
  status: "available" | "occupied";
  temperature: number;
  humidity: number;
  devices?: {
    ac: boolean;
    light: boolean;
    tv: boolean;
  };
}

export function RoomCard({ roomName, status, temperature, humidity, devices = { ac: false, light: false, tv: false } }: RoomCardProps) {
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

  const deviceIconClass = "w-5 h-5 transition-colors duration-200";

  return (
    <Card className={`relative overflow-hidden w-[220px] h-[260px] hover:shadow-lg transition-shadow duration-200 ${status === "available" ? "bg-white" : "bg-neutral-50"}`}>
      {/* Status Indicator */}
      <div className={`absolute top-0 right-0 left-0 h-1 ${status === "available" ? "bg-green-500" : "bg-red-500"}`} />
      
      <div className="p-4">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-2 mb-4">
          <h3 className="font-semibold text-lg text-gray-800">{roomName}</h3>
          <Badge className={`px-3 py-1 rounded-full ${getStatusStyles(status)} capitalize`}>
            {status}
          </Badge>
        </div>

        {/* Environmental Data Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors">
              <Thermometer className={`mb-1 ${getTempColor(temperature)}`} />
              <span className={`text-sm font-medium ${getTempColor(temperature)}`}>
                {temperature}°C
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors">
              <Droplets className={`mb-1 ${getHumidityColor(humidity)}`} />
              <span className={`text-sm font-medium ${getHumidityColor(humidity)}`}>
                {humidity}%
              </span>
            </div>
          </div>

          {/* Devices Section */}
          <div className="pt-2 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 font-medium mb-2 text-center">Connected Devices</p>
            <div className="flex justify-center gap-4">
              <AirVent className={`${deviceIconClass} ${devices.ac ? "text-blue-600" : "text-gray-300"}`} />
              <Lightbulb className={`${deviceIconClass} ${devices.light ? "text-yellow-500" : "text-gray-300"}`} />
              <Tv className={`${deviceIconClass} ${devices.tv ? "text-purple-500" : "text-gray-300"}`} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
