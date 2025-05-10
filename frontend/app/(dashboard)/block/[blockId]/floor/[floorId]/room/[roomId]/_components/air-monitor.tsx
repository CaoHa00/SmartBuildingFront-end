"use client";
import { Droplet, TriangleAlert, Waves, Thermometer } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { CloudFog } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

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

export function AirMonitor() {
  const isMobile = useIsMobile();
  const params = useParams();
  const {
    values,
    loading: isLoading,
    getValueByName,
    fetchEquipmentValues,
  } = useEquipmentValues(params.roomId as string);

  useEffect(() => {
    fetchEquipmentValues();
  }, [fetchEquipmentValues]);

  const humidity = getValueByName("humidity");
  const temperature = getValueByName("temperature");
  const batteryLevel = getValueByName("battery-percentage");
  const activePower = getValueByName("active-power") ?? 0;
  const co2EmissionRate = activePower * 0.8;

  return (
    <div className="w-full h-full aspect-video relative rounded-xl bg-card p-4 border-2 mx-auto">
      <div className="h-1/4 relative rounded-xl bg-gradient-to-r from-blue-900 to-sky-600 mb-2">
        <div className="italic tracking-widest text-[10px] md:text-xs font-bold text-center text-white p-1">
          Temperature
        </div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl md:text-3xl text-white pt-4">
          {temperature ?? "26"}°C
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Thermometer className="w-4 h-4 md:w-6 md:h-6" />
        </div>
        {batteryLevel !== null && batteryLevel !== undefined && (
          <div className="absolute bottom-1 right-2 text-xs text-white">
            Battery: {batteryLevel}%
          </div>
        )}
      </div>

      <div className="h-1/4 relative rounded-xl bg-gradient-to-r from-blue-900 to-sky-600 mb-2">
        <div className="italic tracking-widest text-[10px] md:text-xs font-bold text-center text-white p-1">
          Humidity
        </div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl md:text-3xl text-white pt-4">
          {humidity ?? "65"} %
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Droplet className="w-4 h-4 md:w-6 md:h-6" />
        </div>
      </div>

      <div className="h-[170px] relative rounded-xl bg-gradient-to-r from-blue-900 to-sky-600">
        <div className="italic tracking-widest text-[10px] md:text-xs font-bold text-center text-white p-1">
          CO₂ Emissions
        </div>
        <div className="text-xl md:text-2xl text-center font-bold text-white pt-2">
          {co2EmissionRate.toFixed(2)} tCO₂
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <CloudFog className="w-4 h-4 md:w-6 md:h-6" />
        </div>
        <div className="">
          <ChartContainer config={chartConfig} className="w-full h-[100px]">
            <AreaChart
              data={chartData}
              margin={{ left: 15, right: 15, top: 10, bottom: 0 }}
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
              <CartesianGrid vertical={false} stroke="#1e40af" opacity={0} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: "#fff" }}
                padding={{ left: 10, right: 10 }}
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
      </div>
    </div>
  );
}
