"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { useParams } from "next/navigation";
import { Zap } from "lucide-react";

export function ElectricityCard() {
  const params = useParams();
  const { getValueByName } = useEquipmentValues(params.roomId as string);
  const isMobile = useIsMobile();

  const activePower = getValueByName("active-power");
  const totalPower = getValueByName("total-energy-consumed");

  return (
    <Card className="w-full h-full bg-blue-800 dark:bg-blue-950 text-neutral-100">
      <CardHeader className={`${isMobile ? "px-4 py-3" : "p-4"} pb-2`}>
        <h2 className={`flex items-center font-bold gap-2 ${isMobile ? "text-base" : "text-xl"}`}>
          Electricity Consumption
          <Zap />
        </h2>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full text-center">
            <p className="text-sm text-neutral-200">Total Power</p>
            <p className={`${isMobile ? "text-2xl" : "text-6xl"} font-bold text-cyan-400`}>
              {totalPower}
              <span className="text-sm ml-1">kWh</span>
            </p>
          </div>
          <div className="w-[220px] h-[2px] bg-white/40" />
          <div className="w-full text-center">
            <p className="text-sm text-neutral-200">Active Power</p>
            <p className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold text-cyan-400`}>
              {activePower}
              <span className="text-sm ml-1">kW</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
