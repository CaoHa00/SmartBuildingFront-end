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
    <div className="rounded-xl bg-muted/50 dark:bg-blue-900 w-full h-full shadow-xl p-4">
      <div className="ml-3">
        <h2 className="flex font-bold tracking-wide text-xl text-blue-800 dark:text-blue-400 leading-none">
          AIR CONDITIONERS
        </h2>
        <p className="tracking-widest text-blue-700 dark:text-blue-400 text-xs font-thin leading-none">
          Auto Cooling
        </p>
      </div>
      <div className="bg-blue-800 text-white p-4 rounded-xl mt-4">
        <div className="space-y-6">
          {/* Thermostat Control */}
          <div className="thermostat-container relative w-[200px] h-[200px] mx-auto">
            {/* Background track */}
            <div className="absolute inset-4 rounded-full border-[16px] border-blue-900/30" />

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
              <span className="text-sm text-neutral-200">Temperature</span>
            </div>
          </div>

          {/* Mode Controls */}
          <div className="flex justify-evenly items-center">
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
        </div>
      </div>
    </div>
  );
}
