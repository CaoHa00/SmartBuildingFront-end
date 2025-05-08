"use client";

import { AirVent, Lightbulb, LucideIcon, Gauge, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { useParams } from "next/navigation";

interface Device {
  id: string;
  name: string;
  icon: LucideIcon;
  status: "online" | "offline";
}

const getDeviceIcon = (name: string): LucideIcon => {
  if (name.toLowerCase().includes("ac") || name.toLowerCase().includes("air"))
    return AirVent;
  if (name.toLowerCase().includes("light")) return Lightbulb;
  if (name.toLowerCase().includes("electric")) return Zap;
  if (name.toLowerCase().includes("temp")) return Gauge;
  return Lightbulb;
};

export default function ActiveDeviceControl() {
  const params = useParams();
  const isMobile = useIsMobile();
  const { values, loading, error, fetchEquipmentValues } = useEquipmentValues(
    params.roomId as string
  );
  const [activeDevices, setActiveDevices] = useState<Device[]>([]);

  useEffect(() => {
    if (values && values.length > 0) {
      const devices: Device[] = Array.from(
        new Set(values.map((v) => v.equipmentId))
      ).map((equipmentId) => {
        const equipmentValues = values.filter(
          (v) => v.equipmentId === equipmentId
        );
        const firstValue = equipmentValues[0];
        // Check if any value response is not null/undefined
        const hasValue = equipmentValues.some(
          (v) => v.valueResponse !== null && v.valueResponse !== undefined
        );

        return {
          id: equipmentId,
          name: firstValue.equipmentName,
          icon: getDeviceIcon(firstValue.equipmentName),
          status: hasValue ? "online" : "offline",
        };
      });

      setActiveDevices(devices);
    } else {
      setActiveDevices([]); // Clear devices when no values
    }
  }, [values]);

  if (loading) {
    return (
      <div className="rounded-xl w-full h-full bg-blue-800 shadow-xl p-4">
        <div className="ml-3">
          <h2 className="flex font-bold tracking-wide text-xl text-neutral-100 leading-none">
            Loading Devices...
          </h2>
        </div>
      </div>
    );
  }

  if (error || (!loading && (!values || values.length === 0))) {
    return (
      <div className="rounded-xl w-full h-full bg-blue-800 shadow-xl p-4">
        <div className="ml-3">
          <h2 className="flex font-bold tracking-wide text-xl text-neutral-100 leading-none mb-4">
            Active Devices
          </h2>
          <div className="text-neutral-100">
            <p className="mb-4">{error || "No devices found"}</p>
            <button
              onClick={() => fetchEquipmentValues()}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl w-full h-full bg-blue-800  shadow-xl p-4">
      <div className="ml-3 mb-4">
        <h2 className="flex font-bold tracking-wide text-xl text-neutral-100 leading-none">
          Active Devices
        </h2>
        <p className="tracking-widest text-neutral-100 text-xs font-thin leading-none mt-1">
          Track active devices and controls
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white/10 backdrop-blur-sm dark:bg-blue-950 p-4 rounded-xl shadow-lg transition-all duration-200 hover:bg-white/20 dark:hover:bg-blue-900/70"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-900/50">
                  <device.icon className="w-5 h-5 text-neutral-100" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-100">
                    {device.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
                    <span className="text-sm text-neutral-100">{device.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
