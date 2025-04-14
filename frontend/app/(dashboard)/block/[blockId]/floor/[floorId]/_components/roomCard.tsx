import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  // Different colors for occupied vs available rooms
  const iconClass = status === "occupied" ? "text-blue-700" : "text-green-600";
  
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

  return (
    <Card className="w-[200px] h-[250px] flex flex-col items-center justify-center gap-2 p-4">
      <h3 className="font-semibold text-base">{roomName}</h3>
      <Badge
        className={`text-sm bg-neutral-200 ${
          status === "available" ? "text-green-600" : "text-red-600"
        }`}
      >
        {status}
      </Badge>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Thermometer size={16} className={getTempColor(temperature)} />
              <span className={`text-sm ${getTempColor(temperature)}`}>{temperature}°C</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets size={16} className={getHumidityColor(humidity)} />
              <span className={`text-sm ${getHumidityColor(humidity)}`}>{humidity}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Devices</p>
          <div className="flex gap-2">
            <AirVent className={devices.ac ? iconClass : "text-gray-300"} />
            <Lightbulb className={devices.light ? iconClass : "text-gray-300"} />
            <Tv className={devices.tv ? iconClass : "text-gray-300"} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
