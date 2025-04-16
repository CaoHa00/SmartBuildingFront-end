"use client";

import { Switch } from "@/components/ui/switch";
import { Cctv, Cpu, Lightbulb, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { api } from "@/lib/axios";
import { useParams } from "next/navigation";
import { Category, getCategoryIcon } from '@/types/category';

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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add explicit error logging for each request
        const [equipmentResponse, statusResponse, categoryResponse] = await Promise.all([
          api.get(`/room/${params.roomId}`),
          api.get(`/room/${params.roomId}/status`),
          api.get('/category')  // Changed from '/api/category' to '/category' since baseURL already includes '/api'
        ]);

        console.log('Category Response:', categoryResponse.data); // Debug log

        const equipmentList = equipmentResponse.data.equipments;
        const statusList = statusResponse.data;
        const categoryList = categoryResponse.data;

        const mappedDevices = equipmentList.map((equipment: Equipment) => {
          const status = statusList.find(
            (s: any) =>
              s.valueName === "light status" ||
              s.valueName === "temperature" ||
              s.valueName === "humidity"
          );

          const category = categoryList.find((c: Category) => c.categoryId === equipment.categoryId);
          console.log('Matching category for equipment:', equipment.categoryId, category); // Debug log
          
          return {
            id: equipment.equipmentId.toString(),
            name: equipment.equipmentName,
            icon: getCategoryIcon(category?.categoryName || ''),
            status: "online",
            type: equipment.equipmentTypeName || "Equipment Type " + equipment.equipmentTypeId,
            categoryName: category?.categoryName || "Unknown Category"
          };
        });

        setDevices(mappedDevices);
        setCategories(categoryList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
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
        Loading...
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
                      <p className="text-sm font-medium text-blue-600">{device.categoryName}</p>
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
