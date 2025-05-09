"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { useParams } from "next/navigation";
import { CloudFog } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample daily data - in a real app, this would come from an API
const chartData = [
  { time: "00:00", emission: 0.64 },
  { time: "04:00", emission: 0.48 },
  { time: "08:00", emission: 1.12 },
  { time: "12:00", emission: 1.28 },
  { time: "16:00", emission: 1.04 },
  { time: "20:00", emission: 0.88 },
];

const chartConfig = {
  emission: {
    label: "CO₂ Emission",
    color: "#22c55e",
  },
} satisfies ChartConfig;

const Co2Emission = () => {
  const params = useParams();
  const { getValueByName, loading } = useEquipmentValues(
    params.roomId as string
  );
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
        <CardTitle
          className={`flex items-center gap-2 ${
            isMobile ? "text-base" : "text-xl"
          }`}
        >
          CO₂ Emissions <CloudFog className="text-green-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 items-center justify-center p-4 pb-0">
        <div className="space-y-2">
          <p className={`${isMobile ? "text-xs" : "text-sm"} text-neutral-100`}>
            Current Emission Rate
          </p>
          <p
            className={`${
              isMobile ? "text-lg" : "text-5xl"
            } text-cyan-400 font-bold tracking-tight`}
          >
            {co2EmissionRate.toFixed(2)} kg/h
          </p>
        </div>
        <div className="text-xs text-neutral-300 mb-4">
          Based on current power consumption
        </div>

        <div className="w-full">
          <p
            className={`${
              isMobile ? "text-xs" : "text-sm"
            } text-neutral-100 mb-2`}
          >
            Today's Emission Pattern
          </p>
          <ChartContainer config={chartConfig} className="w-[420px] h-[120px]">
            <AreaChart
              data={chartData}
              margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="gradientEmission"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-emission)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-emission)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#1e40af" opacity={0.1} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "#fff" }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="emission"
                stroke="var(--color-emission)"
                fill="url(#gradientEmission)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Co2Emission;
