"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const dailyData = [
  { time: "00:00", peak: 120, offPeak: 80 },
  { time: "04:00", peak: 90, offPeak: 60 },
  { time: "08:00", peak: 180, offPeak: 120 },
  { time: "12:00", peak: 280, offPeak: 190 },
  { time: "16:00", peak: 245, offPeak: 160 },
  { time: "20:00", peak: 190, offPeak: 130 },
];

const weeklyData = [
  { time: "Monday", peak: 1860, offPeak: 1200 },
  { time: "Tuesday", peak: 2050, offPeak: 1400 },
  { time: "Wednesday", peak: 2370, offPeak: 1650 },
  { time: "Thursday", peak: 1730, offPeak: 1100 },
  { time: "Friday", peak: 2090, offPeak: 1380 },
  { time: "Saturday", peak: 1540, offPeak: 1020 },
  { time: "Sunday", peak: 1340, offPeak: 920 },
];

const chartConfig = {
  peak: {
    label: "Peak Hours",
    color: "hsl(215, 100%, 50%)",
  },
  offPeak: {
    label: "Off-Peak Hours",
    color: "hsl(215, 70%, 70%)",
  },
} satisfies ChartConfig;

export function EnergyChart() {
  const [timeRange, setTimeRange] = useState("day");
  const chartData = timeRange === "day" ? dailyData : weeklyData;

  return (
    <Card className="bg-sky-200 h-[540px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-bold text-2xl uppercase text-blue-800">
              Energy Consumption Overview
            </CardTitle>
            <CardDescription className="font-medium text-sm text-blue-800">
              Peak vs Off-Peak Usage (kWh)
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-white text-blue-800">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="#1e40af" opacity={0.1} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "#1e40af" }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="peak"
              type="monotone"
              stroke="#1e40af"
              strokeWidth={2.5}
              dot={{ fill: "#1e40af", r: 4 }}
            />
            <Line
              dataKey="offPeak"
              type="monotone"
              stroke="#60a5fa"
              strokeWidth={2.5}
              dot={{ fill: "#60a5fa", r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col gap-2 text-sm text-blue-800">
          <div className="flex items-center gap-2 font-medium">
            {timeRange === "day" ? "Daily" : "Weekly"} peak consumption trending
            up
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-blue-700">
            Energy consumption patterns (
            {timeRange === "day" ? "24 hours" : "7 days"})
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
