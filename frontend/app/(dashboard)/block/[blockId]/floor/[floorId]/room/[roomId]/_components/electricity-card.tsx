"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { useParams } from "next/navigation";
import { Zap } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { time: "00:00", consumption: 120 },
  { time: "04:00", consumption: 9 },
  { time: "08:00", consumption: 280 },
  { time: "12:00", consumption: 320 },
  { time: "16:00", consumption: 250 },
  { time: "20:00", consumption: 180 },
];

const chartConfig = {
  consumption: {
    label: "Consumption",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export function ElectricityCard() {
  const params = useParams();
  const { getValueByName } = useEquipmentValues(params.roomId as string);
  const isMobile = useIsMobile();

  const activePower = getValueByName("active-power");
  const totalPower = getValueByName("total-energy-consumed");

  return (
    <Card className="w-full h-full bg-card text-neutral-100">
      <CardHeader className={`${isMobile ? "px-4 py-3" : "p-4"} pb-2`}>
        <h2
          className={`flex items-center font-bold gap-2 justify-between ${
            isMobile ? "text-base" : "text-xl"
          }`}
        >
          Electricity Consumption
          <svg
            className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </h2>
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
          <div className="w-full h-[150px]">
            <ChartContainer config={chartConfig} className="aspect-auto h-full">
              <AreaChart
                data={chartData}
                margin={{ left: 10, right: 10, top: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="gradientConsumption"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--color-consumption)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-consumption)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="#1e40af"
                  opacity={0.1}
                />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "#fff" }}
                  padding={{ left: 10, right: 10 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Area
                  type="monotone"
                  dataKey="consumption"
                  stroke="var(--color-consumption)"
                  fill="url(#gradientConsumption)"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
