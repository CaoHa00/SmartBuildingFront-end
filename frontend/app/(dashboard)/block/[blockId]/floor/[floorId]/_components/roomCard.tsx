import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AirVent, Lightbulb, Tv, Thermometer, Droplets, Zap } from "lucide-react";
import { useRoomStatus } from "@/hooks/useRoomStatus";
import { Skeleton } from "@/components/ui/skeleton";

interface RoomCardProps {
  roomId: string;
  roomName: string;
}

export function RoomCard({ roomId, roomName }: RoomCardProps) {
  const { status, isLoading, error } = useRoomStatus(roomId);

  if (isLoading) {
    return (
      <Card className="w-[200px] h-[250px] flex flex-col items-center justify-center gap-2 p-4">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-6 w-[80px]" />
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4">
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-6 w-[100px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !status) {
    return (
      <Card className="w-[200px] h-[250px] flex flex-col items-center justify-center gap-2 p-4">
        <h3 className="font-semibold text-base">{roomName}</h3>
        <p className="text-sm text-red-500">Error loading data</p>
      </Card>
    );
  }

  // Different colors for occupied vs available rooms
  const iconClass = status.isAvailable ? "text-green-600" : "text-blue-700";

  // If room has no equipment, show simplified card
  if (!status.hasEquipment) {
    return (
      <Card className="w-[200px] h-[250px] flex flex-col items-center justify-center gap-2 p-4">
        <h3 className="font-semibold text-base">{roomName}</h3>
        <Badge className="text-sm bg-neutral-200 text-green-600">
          available
        </Badge>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-sm text-gray-500 text-center">
              Room have no equipments
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
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
          status.isAvailable ? "text-green-600" : "text-red-600"
        }`}
      >
        {status.isAvailable ? "available" : "occupied"}
      </Badge>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Thermometer size={16} className={getTempColor(status.temperature)} />
              <span className={`text-sm ${getTempColor(status.temperature)}`}>
                {status.temperature.toFixed(1)}°C
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets size={16} className={getHumidityColor(status.humidity)} />
              <span className={`text-sm ${getHumidityColor(status.humidity)}`}>
                {status.humidity.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={16} className={status.current > 0 ? "text-yellow-500" : "text-gray-300"} />
            <span className="text-sm">{status.current.toFixed(2)}A</span>
          </div>
          <p className="text-sm text-gray-500">Lights</p>
          <div className="flex gap-2">
            {status.lightStatus.map((isOn, index) => (
              <Lightbulb key={index} className={isOn ? iconClass : "text-gray-300"} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
