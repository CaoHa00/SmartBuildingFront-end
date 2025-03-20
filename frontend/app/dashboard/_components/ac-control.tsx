"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Minus,
  AirVent,
  CircleMinus,
  CirclePlus,
  Droplet,
  Snowflake,
  Wind,
} from "lucide-react";

export function AirConditionerControl() {
  const [temperature, setTemperature] = React.useState(22);

  const increaseTemp = () => {
    setTemperature((prev) => Math.min(32, prev + 1));
  };

  const decreaseTemp = () => {
    setTemperature((prev) => Math.max(16, prev - 1));
  };

  const percentage = ((temperature - 16) / (32 - 16)) * 100;
  const rotation = (percentage / 100) * 360;

  return (
    <Card className="flex flex-col bg-blue-700 rounded-xl p-4">
      <CardContent className="space-y-6">
        {/* Header */}
        <div className="flex items-start">
          <div className="p-2 rounded-full bg-white">
            <AirVent color="blue" />
          </div>
          <div className="ml-4">
            <h2 className="font-bold tracking-wide text-xl text-white">
              AIR CONDITIONERS
            </h2>
            <p className="tracking-widest text-sky-100 text-xs font-thin">
              Auto Cooling
            </p>
          </div>
        </div>

        {/* Thermostat Control */}
        <div className="thermostat-container relative w-[200px] h-[200px] mx-auto">
          {/* Background track */}
          <div className="absolute inset-4 rounded-full border-[16px] border-blue-800/30" />

          {/* Progress track */}
          <div
            className="absolute inset-4 rounded-full border-[16px] border-t-white border-r-white border-b-transparent border-l-transparent"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.2s ease",
            }}
          />

          {/* Temperature display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {temperature}°C
            </span>
            <span className="text-sm text-blue-200">Temperature</span>
          </div>
        </div>

        {/* Mode Controls */}
        <div className="flex justify-evenly items-center pt-8">
          <button className="text-white">
            <CircleMinus onClick={decreaseTemp} />
          </button>
          <button className="p-2 rounded-full bg-sky-300 text-white">
            <Wind />
          </button>
          <button className="p-3 rounded-full bg-blue-900 text-white">
            <Snowflake size={30} />
          </button>
          <button className="p-2 rounded-full bg-sky-300 text-white">
            <Droplet />
          </button>
          <button className="text-white">
            <CirclePlus onClick={increaseTemp} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
