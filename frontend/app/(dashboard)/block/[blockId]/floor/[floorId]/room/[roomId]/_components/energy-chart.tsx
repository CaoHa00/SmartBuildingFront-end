"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Area, AreaChart, XAxis } from "recharts";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { useElectricityData } from "@/hooks/useElectricityData";
import useCurrentElectricalReading from "@/hooks/useCurrentElectricalReading";
import useTotalElectricalReading from "@/hooks/useTotalElectricalReading";

interface ChartDataPoint {
  time: string;
  power: number;
  accumulated: number;
}

const chartConfig = {
  power: {
    label: "Active Power (kW)",
    color: "hsl(215, 100%, 50%)",
  },
  accumulated: {
    label: "Total Energy (kWh)",
    color: "hsl(215, 70%, 70%)",
  },
} satisfies ChartConfig;

export function EnergyChart() {
  const [timeRange, setTimeRange] = useState("day");
  const isMobile = useIsMobile();
  const { data: liveData } = useElectricityData();
  const currentReading = useCurrentElectricalReading();
  const totalReading = useTotalElectricalReading();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (liveData?.active_power !== undefined) {
      const now = new Date();
      const newDataPoint = {
        time: now.toLocaleTimeString(),
        power: liveData.active_power,
        accumulated: totalReading?.cumulativeEnergy || 0,
      };

      setChartData(prevData => {
        const newData = [...prevData, newDataPoint];
        const maxPoints = timeRange === "day" ? 24 : 7;
        return newData.slice(-maxPoints);
      });
    }
  }, [liveData, totalReading, timeRange]);

  return (
    <Card className="bg-background dark:bg-blue-900 shadow-lg rounded-xl">
      <CardHeader className={isMobile ? 'px-2 py-3' : ''}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div>
            <CardTitle className={`font-bold uppercase text-blue-800 dark:text-blue-400 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
              Energy Consumption
            </CardTitle>
            <CardDescription className="font-medium text-sm text-blue-800 dark:text-blue-500">
              Power Usage & Total Energy
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-white dark:bg-slate-800 text-blue-800 dark:text-blue-400">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className={isMobile ? 'px-2' : ''}>
        <ChartContainer config={chartConfig} className={`${isMobile ? 'h-[180px]' : 'h-[220px]'} w-full`}>
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="hsl(215, 70%, 30%)" opacity={0.2} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(215, 70%, 50%)" }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="power"
              type="monotone"
              stroke="hsl(215, 100%, 50%)"
              strokeWidth={2}
              fill="hsl(215, 100%, 50%)"
              fillOpacity={0.2}
              dot={{ fill: "hsl(215, 100%, 50%)", r: 3 }}
            />
            <Area
              dataKey="accumulated"
              type="monotone"
              stroke="hsl(215, 70%, 70%)"
              strokeWidth={2}
              fill="hsl(215, 70%, 70%)"
              fillOpacity={0.1}
              dot={{ fill: "hsl(215, 70%, 70%)", r: 3 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
