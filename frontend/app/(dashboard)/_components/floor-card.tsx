"use client";

import { Camera, CameraOff } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface FloorCardProps {
  floorName: string;
  occupancy: number;
  temperature: number;
  humidity: number;
  totalRooms: number;
  activeRooms: number;
}

export function FloorCard({ 
  floorName, 
  occupancy, 
  temperature, 
  humidity,
  totalRooms,
  activeRooms 
}: FloorCardProps) {
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);

  return (
    <Card className="w-full bg-white/90 rounded-xl shadow-sm dark:bg-blue-800">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div>
          <h3 className="text-lg font-bold text-blue-800 dark:text-neutral-200">{floorName}</h3>
          <p className="text-sm text-gray-500 dark:text-neutral-200">
            {activeRooms}/{totalRooms} rooms active
          </p>
        </div>
        <button
          onClick={() => setIsCameraEnabled(!isCameraEnabled)}
          className="p-1.5 rounded-full hover:bg-blue-100"
        >
          {isCameraEnabled ? (
            <Camera className="text-blue-800 dark:text-neutral-200" size={20} />
          ) : (
            <CameraOff className="text-gray-400 dark:text-neutral-200" size={20} />
          )}
        </button>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-3">
          {isCameraEnabled ? (
            <div className="w-full h-full flex items-center justify-center text-white">
              Live Feed
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Camera Disabled
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-gray-500 dark:text-neutral-200">Occupancy</p>
            <p className="font-semibold">{occupancy} people</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-neutral-200">Temperature</p>
            <p className="font-semibold">{temperature}°C</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-neutral-200">Humidity</p>
            <p className="font-semibold">{humidity}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
