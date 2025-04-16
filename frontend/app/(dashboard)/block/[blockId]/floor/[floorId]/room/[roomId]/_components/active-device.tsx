"use client";

import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { api } from "@/lib/axios";
import { useParams } from "next/navigation";
import { Category, getCategoryIcon } from "@/types/category";

interface Device {
  id: string;
  name: string;
  icon: LucideIcon;
  status: "online" | "offline";
  type: string;
  categoryName?: string;
}

interface Equipment {
  equipmentId: number;
  equipmentName: string;
  deviceId: string;
  equipmentTypeId?: number;
  equipmentTypeName?: string;
  equipmentStatus?: string;
  roomId: number;
  categoryId: number;
}

export default function ActiveDevice() {
  const isMobile = useIsMobile();
  const params = useParams();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);

        const [equipmentResponse, statusResponse, categoryResponse] =
          await Promise.all([
            api.get(`/room/${params.roomId}`).catch((err) => {
              console.error("Equipment fetch error:", err);
              throw new Error("Failed to fetch equipment data");
            }),
            api.get(`/room/${params.roomId}/status`).catch((err) => {
              console.error("Status fetch error:", err);
              throw new Error("Failed to fetch status data");
            }),
            api.get("/category").catch((err) => {
              console.error("Category fetch error:", err);
              throw new Error("Failed to fetch category data");
            }),
          ]);

        if (!equipmentResponse.data?.equipments) {
          throw new Error("Invalid equipment data received");
        }

        const equipmentList = equipmentResponse.data.equipments;
        const statusList = statusResponse.data || [];
        const categoryList = categoryResponse.data || [];

        const mappedDevices = equipmentList.map((equipment: Equipment) => {
          const status = statusList.find(
            (s: any) =>
              s.valueName === "light status" ||
              s.valueName === "temperature" ||
              s.valueName === "humidity"
          );

          const category = categoryList.find(
            (c: Category) => c.categoryId === equipment.categoryId
          );
          console.log(
            "Matching category for equipment:",
            equipment.categoryId,
            category
          ); // Debug log

          return {
            id: equipment.equipmentId.toString(),
            name: equipment.equipmentName,
            icon: getCategoryIcon(category?.categoryName || ""),
            status: "online",
            type:
              equipment.equipmentTypeName ||
              "Equipment Type " + equipment.equipmentTypeId,
            categoryName: category?.categoryName || "Sensor",
          };
        });

        setDevices(mappedDevices);
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
        setDevices([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.roomId]);

  const toggleDeviceStatus = async (deviceId: string) => {
    try {
      // Update device status through Aqara API
      const value =
        devices.find((d) => d.id === deviceId)?.status === "online" ? 0 : 1;
      await api.post(
        `/aqara/light-control?equipmentId=${deviceId}&value=${value}&buttonPosition=2`
      );

      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device.id === deviceId
            ? {
                ...device,
                status: device.status === "online" ? "offline" : "online",
              }
            : device
        )
      );
    } catch (error) {
      console.error("Error toggling device status:", error);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-muted/50 w-full h-full shadow-xl p-4">
        <div className="flex items-center justify-center h-full">
          <p>Loading devices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-muted/50 w-full h-full shadow-xl p-4">
        <div className="flex flex-col items-center justify-center h-full text-red-600">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl bg-muted/50 w-full h-full ${
        isMobile ? "col-span-1" : "col-span-2 md:col-span-1"
      } shadow-xl p-4`}
    >
      <div className="ml-3">
        <h2 className="flex font-bold tracking-wide text-xl text-blue-800 leading-none">
          Active Devices
        </h2>
        <p className="tracking-widest text-blue-700 text-xs font-thin leading-none">
          Track active devices for connectivity
        </p>
      </div>
      <div className="bg-blue-800 text-white p-4 rounded-xl mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-max rounded-xl bg-blue-800 gap-4">
          {devices.map((device) => (
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
                      <p className="text-sm font-medium text-blue-600">
                        {device.categoryName}
                      </p>
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
