"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { useParams } from "next/navigation";
import { CloudFog } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Co2Emission = () => {
  const params = useParams();
  const { getValueByName, loading } = useEquipmentValues(params.roomId as string);
  const isMobile = useIsMobile();

  // Get active power in kW
  const activePower = getValueByName("active-power") ?? 0;
  
  // Calculate CO2 emissions using the conversion factor
  // Using 0.8 kg CO2 per kWh as a general conversion factor
  const co2EmissionRate = activePower * 0.8;

  if (loading) {
    return (
      <Card className="w-full h-full bg-blue-800 p-4 animate-pulse">
        <div className="h-4 bg-blue-700 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-blue-700 rounded"></div>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full bg-blue-800 shadow-xl dark:bg-blue-950 text-neutral-100">
      <CardHeader className={`${isMobile ? "px-4 py-3" : "p-4"} pb-2`}>
        <CardTitle className={`flex items-center gap-2 ${isMobile ? "text-base" : "text-xl"}`}>
          CO₂ Emissions <CloudFog className="text-green-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 items-center justify-center p-4">
        <div className="space-y-2">
          <p className={`${isMobile ? "text-xs" : "text-sm"} text-neutral-100`}>
            Current Emission Rate
          </p>
          <p className={`${isMobile ? "text-lg" : "text-5xl"} text-cyan-400 font-bold tracking-tight`}>
            {co2EmissionRate.toFixed(2)} kg/h
          </p>
        </div>
        <div className="text-xs text-neutral-300">
          Based on current power consumption
        </div>
      </CardContent>
    </Card>
  );
};

export default Co2Emission;
