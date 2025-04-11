"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Camera, CameraOff } from "lucide-react";
import { useState } from "react";

export function CctvCard() {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <Card className="w-full h-full rounded-2xl">
      <CardContent className="p-4 bg-blue-400 rounded-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">CCTV System</h2>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className="p-2 rounded-full hover:bg-blue-700"
            >
              {isEnabled ? (
                <Camera className="text-white" size={20} />
              ) : (
                <CameraOff className="text-white" size={20} />
              )}
            </button>
          </div>
          
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {isEnabled ? (
              <div className="w-full h-full flex items-center justify-center text-white">
                Live Feed
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Camera Disabled
              </div>
            )}
          </div>

          <div className="text-white text-sm">
            <p>Status: {isEnabled ? 'Connected' : 'Disconnected'}</p>
            <p>Location: Main Entrance</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
