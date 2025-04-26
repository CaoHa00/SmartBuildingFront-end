"use client";

import { Switch } from "@/components/ui/switch";
import { AirVent, Lightbulb, LucideIcon, Gauge, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { api } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

interface Device {
  id: string;
  name: string;
  icon: LucideIcon;
  status: "online" | "offline";
  isLightSwitch: boolean;
  lightStatus?: boolean;
}

// Keys for localStorage
const LIGHT_SWITCH_STATUS_KEY = "lightSwitchStatus";

const getDeviceIcon = (name: string): LucideIcon => {
  if (name.toLowerCase().includes("ac") || name.toLowerCase().includes("air"))
    return AirVent;
  if (name.toLowerCase().includes("light")) return Lightbulb;
  if (name.toLowerCase().includes("electric")) return Zap;
  if (name.toLowerCase().includes("temp")) return Gauge;
  return Lightbulb;
};

export default function ActiveDevice() {
  const params = useParams();
  const isMobile = useIsMobile();
  const { values, loading, error, fetchEquipmentValues } = useEquipmentValues(
    params.roomId as string
  );
  const [activeDevices, setActiveDevices] = useState<Device[]>([]);

  // Load saved light switch statuses from localStorage
  useEffect(() => {
    const savedStatuses = localStorage.getItem(LIGHT_SWITCH_STATUS_KEY);
    if (savedStatuses) {
      const parsedStatuses = JSON.parse(savedStatuses);
      setActiveDevices((prev) =>
        prev.map((device) => ({
          ...device,
          lightStatus: device.isLightSwitch
            ? parsedStatuses[device.id] ?? device.lightStatus
            : device.lightStatus,
        }))
      );
    }
  }, []);

  // Save light switch statuses to localStorage whenever they change
  useEffect(() => {
    const lightSwitches = activeDevices.filter((d) => d.isLightSwitch);
    if (lightSwitches.length > 0) {
      const statusesToSave = lightSwitches.reduce(
        (acc, device) => ({
          ...acc,
          [device.id]: device.lightStatus,
        }),
        {}
      );
      localStorage.setItem(
        LIGHT_SWITCH_STATUS_KEY,
        JSON.stringify(statusesToSave)
      );
    }
  }, [activeDevices]);

  const handleLightSwitch = async (deviceId: string, newStatus: boolean) => {
    try {
      const value = newStatus ? 1 : 0;
      await api.post(`/spaces/${params.roomId}/light-control?value=${value}`);

      setActiveDevices((prev) =>
        prev.map((device) =>
          device.id === deviceId
            ? { ...device, lightStatus: newStatus }
            : device
        )
      );

      toast({
        title: "Light switch updated",
        description: `Light has been turned ${newStatus ? "on" : "off"}.`,
      });

      // Refresh the equipment values after a short delay
      setTimeout(() => {
        fetchEquipmentValues();
      }, 1000);
    } catch (error: any) {
      console.error("Error controlling light:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      const errorMessage = error.response?.data?.message || error.message || "Failed to control the light switch";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

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
        const isLightSwitch = firstValue.equipmentName
          .toLowerCase()
          .includes("light");

        // Get the light status from the API response - strictly check for 1.0 as on, 0.0 as off
        let apiLightStatus;
        if (isLightSwitch) {
          const lightStatusValue = equipmentValues.find(
            (v) => v.valueName === "light-status"
          )?.valueResponse;
          apiLightStatus = lightStatusValue === 1; // Only true if exactly 1.0
        }

        // Try to get saved status from localStorage for light switches
        let savedStatus;
        if (isLightSwitch) {
          const savedStatuses = localStorage.getItem(LIGHT_SWITCH_STATUS_KEY);
          if (savedStatuses) {
            const parsedStatuses = JSON.parse(savedStatuses);
            savedStatus = parsedStatuses[equipmentId];
          }
        }

        return {
          id: equipmentId,
          name: firstValue.equipmentName,
          icon: getDeviceIcon(firstValue.equipmentName),
          status: hasValue ? "online" : "offline",
          isLightSwitch,
          lightStatus: savedStatus ?? apiLightStatus ?? false,
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
      <div className="space-y-4">
        {activeDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white/10 backdrop-blur-sm dark:bg-blue-900/50 p-4 rounded-xl shadow-lg transition-all duration-200 hover:bg-white/20 dark:hover:bg-blue-900/70"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-900/50">
                  <device.icon
                    className={`w-5 h-5 text-neutral-100 ${
                      device.isLightSwitch && device.lightStatus
                        ? "text-green-500"
                        : ""
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-100">
                    {device.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {device.isLightSwitch && (
                  <Switch
                    checked={device.lightStatus}
                    onCheckedChange={(checked) =>
                      handleLightSwitch(device.id, checked)
                    }
                    className="data-[state=checked]:bg-green-500"
                  />
                )}
                {device.isLightSwitch ? (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      device.lightStatus
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {device.lightStatus ? "online" : "offline"}
                  </span>
                ) : (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      device.status === "online"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {device.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
