"use client";

import { useState, useEffect } from "react";
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
        accumulated: totalReading?.electricalReading || 0,
      };

      setChartData(prevData => {
        const newData = [...prevData, newDataPoint];
        // Keep last 24 points for daily view, or last 7 points for weekly view
        const maxPoints = timeRange === "day" ? 24 : 7;
        return newData.slice(-maxPoints);
      });
    }
  }, [liveData, totalReading, timeRange]);

  return (
    <Card className={`bg-sky-200 shadow-lg rounded-xl ${isMobile ? 'p-2' : 'p-4'}`}>
      <CardHeader className={isMobile ? 'px-2 py-3' : ''}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div>
            <CardTitle className={`font-bold uppercase text-blue-800 ${isMobile ? 'text-lg' : 'text-2xl'}`}>
              Energy Consumption
            </CardTitle>
            <CardDescription className="font-medium text-sm text-blue-800">
              Power Usage & Total Energy
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
      <CardContent className={isMobile ? 'px-2' : ''}>
        <ChartContainer config={chartConfig} className={`${isMobile ? 'h-[180px]' : 'h-[220px]'} w-full`}>
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
              dataKey="power"
              type="monotone"
              stroke="#1e40af"
              strokeWidth={2.5}
              dot={{ fill: "#1e40af", r: 4 }}
            />
            <Line
              dataKey="accumulated"
              type="monotone"
              stroke="#60a5fa"
              strokeWidth={2.5}
              dot={{ fill: "#60a5fa", r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
