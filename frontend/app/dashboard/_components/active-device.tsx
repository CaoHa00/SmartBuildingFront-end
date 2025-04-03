"use client";

import { Switch } from "@/components/ui/switch";
import {
  AirVent,
  Cctv,
  LayoutDashboard,
  Lightbulb,
  LucideIcon,
  TvMinimal,
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Device {
  id: string;
  name: string;
  icon: LucideIcon;
  status: "online" | "offline";
  type: string;
}

const mockDevices: Device[] = [
  {
    id: "1",
    name: "Room AC",
    status: "online",
    type: "Climate Control",
    icon: AirVent,
  },
  {
    id: "2",
    name: "Smart Light",
    status: "online",
    type: "Lighting",
    icon: Lightbulb,
  },
  {
    id: "3",
    name: "Security Cam",
    status: "offline",
    type: "Security",
    icon: Cctv,
  },
  {
    id: "4",
    name: "Smart TV",
    status: "online",
    type: "Entertainment",
    icon: TvMinimal,
  },
];

export default function ActiveDevice({ devices = mockDevices }) {
  const isMobile = useIsMobile();
  const [activeDevices, setActiveDevices] = useState(devices);

  const toggleDeviceStatus = (deviceId: string) => {
    setActiveDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              status: device.status === "online" ? "offline" : "online",
            }
          : device
      )
    );
  };

  return (
    <div
      className={`rounded-xl bg-muted/50 w-full h-full ${
        isMobile ? "col-span-1" : "col-span-2 md:col-span-1"
      } shadow-xl p-4`}
    >
      <div className="ml-3">
        <h2 className="flex font-bold tracking-wide text-xl text-blue-800 leading-none">
          Active Device
        </h2>
        <p className="tracking-widest text-blue-700 text-xs font-thin leading-none">
          Track active devices for connectivity
        </p>
      </div>
      <div className="bg-blue-800 text-white p-4 rounded-xl mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max rounded-xl bg-blue-800 gap-4">
          {activeDevices.map((device) => (
            <div
              key={device.id}
              className={`bg-neutral-200 text-blue-700 p-4 rounded-xl shadow-lg ${
                isMobile ? "p-3" : ""
              }`}
            >
              <div className="flex flex-col h-full gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      <device.icon />
                    </span>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">
                        {device.name}
                      </h3>
                      <p className="text-sm text-gray-500">{device.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        device.status === "online"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <Switch
                      checked={device.status === "online"}
                      onCheckedChange={() => toggleDeviceStatus(device.id)}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
