"use client";

import React from "react";
import {
  CircleMinus,
  CirclePlus,
  Droplet,
  Snowflake,
  Wind,
  Power
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function AirConditionerControl() {
  const [temperature, setTemperature] = React.useState(22);
  const [isPowered, setIsPowered] = React.useState(false);

  const increaseTemp = () => {
    if (!isPowered) return;
    setTemperature((prev) => Math.min(32, prev + 1));
  };

  const decreaseTemp = () => {
    if (!isPowered) return;
    setTemperature((prev) => Math.max(16, prev - 1));
  };

  const percentage = ((temperature - 16) / (32 - 16)) * 100;
  const rotation = (percentage / 100) * 360;

  return (
    <div className="rounded-xl bg-blue-800 dark:bg-blue-900 w-full h-full shadow-xl p-4">
      <div className="ml-3 flex justify-between items-center">
        <div>
          <h2 className="flex font-bold tracking-wide text-xl text-neutral-100 dark:text-neutral-100 leading-none">
            AIR CONDITIONERS
          </h2>
          <p className="tracking-widest text-neutral-100 text-xs font-thin leading-none">
            {isPowered ? "Auto Cooling" : "Powered Off"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Power className={`h-4 w-4 ${isPowered ? 'text-green-400' : 'text-neutral-400'}`} />
          <Switch
            checked={isPowered}
            onCheckedChange={setIsPowered}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>
      <div className={`bg-blue-800 text-white p-4 rounded-xl mt-4 ${!isPowered && 'opacity-50'}`}>
        <div className="space-y-6">
          {/* Thermostat Control */}
          <div className="thermostat-container relative w-[200px] h-[200px] mx-auto">
            {/* Temperature display */}
            <div className="absolute inset-0 flex flex-col items-center text-2xl text-yellow-500 font-bold justify-center">
              <span className="text-8xl font-bold text-white">
                {temperature}°C
              </span>
              <span className="text-sm text-neutral-200">Temperature</span>
            </div>
          </div>

          {/* Mode Controls */}
          <div className="flex justify-evenly items-center">
            <button className="text-white" disabled={!isPowered}>
              <CircleMinus onClick={decreaseTemp} />
            </button>
            <button className={`p-2 rounded-full ${isPowered ? 'bg-sky-300' : 'bg-gray-500'} text-white`} disabled={!isPowered}>
              <Wind />
            </button>
            <button className={`p-3 rounded-full ${isPowered ? 'bg-blue-900 dark:bg-green-400' : 'bg-gray-500'} text-white`} disabled={!isPowered}>
              <Snowflake size={30} />
            </button>
            <button className={`p-2 rounded-full ${isPowered ? 'bg-sky-300' : 'bg-gray-500'} text-white`} disabled={!isPowered}>
              <Droplet />
            </button>
            <button className="text-white" disabled={!isPowered}>
              <CirclePlus onClick={increaseTemp} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
