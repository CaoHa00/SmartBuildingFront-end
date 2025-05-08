"use client";

import { Switch } from "@/components/ui/switch";
import { Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { api } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

interface LightDevice {
  id: string;
  name: string;
  status: "online" | "offline";
  isOn: boolean;
}

// Key for localStorage
const LIGHT_STATUS_KEY = "lightStatus";

export default function LightControl() {
  const params = useParams();
  const isMobile = useIsMobile();
  const { values, loading, error, fetchEquipmentValues } = useEquipmentValues(
    params.roomId as string
  );
  const [lights, setLights] = useState<LightDevice[]>([]);

  // Load saved light statuses from localStorage
  useEffect(() => {
    const savedStatuses = localStorage.getItem(LIGHT_STATUS_KEY);
    if (savedStatuses) {
      const parsedStatuses = JSON.parse(savedStatuses);
      setLights((prev) =>
        prev.map((light) => ({
          ...light,
          isOn: parsedStatuses[light.id] ?? light.isOn,
        }))
      );
    }
  }, []);

  // Save light statuses to localStorage whenever they change
  useEffect(() => {
    if (lights.length > 0) {
      const statusesToSave = lights.reduce(
        (acc, light) => ({
          ...acc,
          [light.id]: light.isOn,
        }),
        {}
      );
      localStorage.setItem(LIGHT_STATUS_KEY, JSON.stringify(statusesToSave));
    }
  }, [lights]);

  const handleLightSwitch = async (deviceId: string, newStatus: boolean) => {
    try {
      const value = newStatus ? 1 : 0;
      await api.post(`/spaces/${params.roomId}/light-control?value=${value}`);

      setLights((prev) =>
        prev.map((light) =>
          light.id === deviceId
            ? { ...light, isOn: newStatus }
            : light
        )
      );

      toast({
        title: "Light updated",
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
        data: error.response?.data,
      });

      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to control the light",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (values && values.length > 0) {
      const lightDevices: LightDevice[] = Array.from(
        new Set(values.map((v) => v.equipmentId))
      )
        .map((equipmentId) => {
          const equipmentValues = values.filter(
            (v) => v.equipmentId === equipmentId
          );
          const firstValue = equipmentValues[0];
          // Check if any value response is not null/undefined
          const hasValue = equipmentValues.some(
            (v) => v.valueResponse !== null && v.valueResponse !== undefined
          );

          // Get the light status from the API response
          const lightStatus = equipmentValues.find(
            (v) => v.valueName === "light-status"
          )?.valueResponse;

          // Only include if it's a light device
          if (!firstValue.equipmentName.toLowerCase().includes("light")) {
            return null;
          }

          return {
            id: equipmentId,
            name: firstValue.equipmentName,
            status: hasValue ? "online" : "offline",
            isOn: lightStatus === 1,
          };
        })
        .filter((device): device is LightDevice => device !== null);

      setLights(lightDevices);
    } else {
      setLights([]); // Clear lights when no values
    }
  }, [values]);

  if (loading) {
    return (
      <div className="rounded-xl w-full h-full bg-blue-800 shadow-xl p-4">
        <div className="ml-3">
          <h2 className="flex font-bold tracking-wide text-xl text-neutral-100 leading-none">
            Loading Lights...
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
            Light Control
          </h2>
          <div className="text-neutral-100">
            <p className="mb-4">{error || "No lights found"}</p>
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
    <div className="rounded-xl w-full h-full bg-blue-800 shadow-xl p-4">
      <div className="ml-3 mb-4">
        <h2 className="flex font-bold tracking-wide text-xl text-neutral-100 leading-none">
          Light Control
        </h2>
        <p className="tracking-widest text-neutral-100 text-xs font-thin leading-none mt-1">
          Control room lighting
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lights.map((light) => (
          <div
            key={light.id}
            className="bg-white/10 backdrop-blur-sm dark:bg-blue-950 p-4 rounded-xl shadow-lg transition-all duration-200 hover:bg-white/20 dark:hover:bg-blue-900/70"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-blue-900/50 ${light.isOn ? "text-yellow-400" : "text-neutral-100"}`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-100">
                    {light.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Switch
                  checked={light.isOn}
                  onCheckedChange={(checked) =>
                    handleLightSwitch(light.id, checked)
                  }
                  className="data-[state=checked]:bg-green-500"
                />
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    light.isOn
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {light.isOn ? "on" : "off"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
