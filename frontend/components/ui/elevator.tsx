"use client";

import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { TooltipProps } from "recharts";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface ElevatorProps {
  id: string;
  status: "moving" | "idle" | "maintenance";
  phaseConsumption: {
    phase1: number;
    phase2: number;
    phase3: number;
  };
  totalConsumption: number;
}

const chartData = [
  { hour: "01:00", reading: 20 },
  { hour: "02:00", reading: 16 },
  { hour: "03:00", reading: 18 },
  { hour: "04:00", reading: 21 },
  { hour: "05:00", reading: 25 },
  { hour: "06:00", reading: 34 },
  { hour: "07:00", reading: 45 },
  { hour: "08:00", reading: 194 },
  { hour: "09:00", reading: 143 },
  { hour: "10:00", reading: 312 },
  { hour: "11:00", reading: 298 },
  { hour: "12:00", reading: 343 },
  { hour: "13:00", reading: 331 },
  { hour: "14:00", reading: 171 },
  { hour: "15:00", reading: 221 },
  { hour: "16:00", reading: 154 },
  { hour: "17:00", reading: 199 },
  { hour: "18:00", reading: 110 },
  { hour: "19:00", reading: 89 },
  { hour: "20:00", reading: 43 },
  { hour: "21:00", reading: 22 },
  { hour: "22:00", reading: 19 },
  { hour: "23:00", reading: 21 },
  { hour: "24:00", reading: 20 },
];

const chartConfig = {
  reading: {
    label: "Reading",
    color: "#fff",
  },
} satisfies ChartConfig;

export const Elevator = ({
  id,
  status,
  phaseConsumption,
  totalConsumption,
}: ElevatorProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "moving":
        return "bg-green-500";
      case "maintenance":
        return "bg-amber-500";
      default:
        return "bg-slate-500";
    }
  };

  const currentConsumption =
    phaseConsumption.phase1 + phaseConsumption.phase2 + phaseConsumption.phase3;

  const ChartTooltipContent = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;

    return (
      <div className="rounded-md border bg-background p-2 shadow-sm">
        <p className="text-sm font-medium text-foreground">
          Reading: {data.reading} kW
        </p>
        <p className="text-sm text-muted-foreground">Time: {data.hour}</p>
      </div>
    );
  };

  return (
    <div className="h-[435px] bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-4 rounded-xl border border-slate-200/50 dark:border-primary hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
            <svg
              className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Elevator {id}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`}
              />
              <span className="text-xs capitalize text-slate-600 dark:text-slate-400">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Phase 1</p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {phaseConsumption.phase1.toFixed(2)} kW
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Phase 2</p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {phaseConsumption.phase2.toFixed(2)} kW
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Phase 3</p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {phaseConsumption.phase3.toFixed(2)} kW
          </p>
        </div>
      </div> */}

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Current Total:
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {currentConsumption.toFixed(2)} kW
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Usage:
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {totalConsumption.toFixed(2)} kWh
          </p>
        </div>
      </div>

      {/* <div className="mt-4 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{
            width: `${(currentConsumption / totalConsumption) * 100}%`,
          }}
        />
      </div> */}

      <div className="h-[290px] relative mt-5">
        <ChartContainer
          config={chartConfig}
          className="bottom-0 absolute mx-auto w-full h-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 10, right: 10 }}
          >
            <CartesianGrid
              vertical={false}
              horizontal={true}
              stroke="#757575"
            />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              ticks={["01:00", "12:00", "24:00"]}
              tickFormatter={(value) => value}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              width={30}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="reading" fill="var(--color-reading)" radius={5} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
