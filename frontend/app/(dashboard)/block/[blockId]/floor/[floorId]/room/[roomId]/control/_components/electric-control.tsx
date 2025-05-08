"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { useParams } from "next/navigation";
import { Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const POWER_STATUS_KEY = "electricPowerStatus";

export function ElectricControl() {
  const params = useParams();
  const { getValueByName, fetchEquipmentValues } = useEquipmentValues(
    params.roomId as string
  );
  const isMobile = useIsMobile();
  const [isPowered, setIsPowered] = useState(false);

  const activePower = getValueByName("active-power");
  const totalPower = getValueByName("total-energy-consumed");

  // Load saved power status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem(POWER_STATUS_KEY);
    if (savedStatus !== null) {
      setIsPowered(JSON.parse(savedStatus));
    }
  }, []);

  // Save power status to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(POWER_STATUS_KEY, JSON.stringify(isPowered));
  }, [isPowered]);

  const handlePowerSwitch = async (checked: boolean) => {
    try {
      const value = checked ? 1 : 0;
      await api.post(`/spaces/${params.roomId}/power-control?value=${value}`);

      setIsPowered(checked);
      toast({
        title: "Power control updated",
        description: `Power has been turned ${checked ? "on" : "off"}.`,
      });

      // Refresh the equipment values after a short delay
      setTimeout(() => {
        fetchEquipmentValues();
      }, 1000);
    } catch (error: any) {
      console.error("Error controlling power:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to control the power",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full h-full bg-blue-800 dark:bg-blue-950 text-neutral-100">
      <CardHeader className={`${isMobile ? "px-4 py-3" : "p-4"} pb-2`}>
        <div className="flex items-center justify-between">
          <h2
            className={`flex items-center font-bold gap-2 ${
              isMobile ? "text-base" : "text-xl"
            }`}
          >
            Electricity Consumption
            <Zap />
          </h2>
          <div className="flex items-center gap-2">
            <Switch
              checked={isPowered}
              onCheckedChange={handlePowerSwitch}
              className="data-[state=checked]:bg-green-500"
            />
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                isPowered
                  ? "bg-green-500/20 text-green-300"
                  : "bg-red-500/20 text-red-300"
              }`}
            >
              {isPowered ? "on" : "off"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full text-center">
            <p className="text-sm text-neutral-200">Total Power</p>
            <p
              className={`${
                isMobile ? "text-2xl" : "text-6xl"
              } font-bold text-cyan-400`}
            >
              {totalPower}
              <span className="text-sm ml-1">kWh</span>
            </p>
          </div>
          <div className="w-[220px] h-[2px] bg-white/40" />
          <div className="w-full text-center">
            <p className="text-sm text-neutral-200">Active Power</p>
            <p
              className={`${
                isMobile ? "text-2xl" : "text-3xl"
              } font-bold text-cyan-400`}
            >
              {activePower}
              <span className="text-sm ml-1">kW</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
