"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCurrentElectricalReading from "@/hooks/use-current-electrical-reading";
import useTotalElectricalReading from "@/hooks/use-total-electrical-reading";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { TooltipProps } from "recharts";
import { format, parseISO } from "date-fns";

const chartConfig = {
  cumulativeEnergy: {
    label: "Cumulative Energy",
    color: "#22c55e",
  },
} satisfies ChartConfig;

export default function ElectricalReadingCard() {
  const currentReading = useCurrentElectricalReading();
  const totalReading = useTotalElectricalReading();

  const realData = totalReading.dailyReadings;
  console.log(realData);

  const ChartTooltipContent = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;

    return (
      <div className="rounded-md border bg-background p-2 shadow-sm">
        <p className="text-sm font-medium text-foreground">
          Cumulative: {data.cumulativeEnergy?.toFixed(2)} kWh
        </p>
        <p className="text-sm text-muted-foreground">
          Time: {format(parseISO(data.timestamp), "HH:mm")}
        </p>
      </div>
    );
  };

  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-xl card-foreground">
            <div className="flex justify-between">
              <span>ELECTRICITY</span>
              <div className="pt-1">
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
              </div>
            </div>
          </CardTitle>
          <CardDescription>BLOCK 8</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="m-auto flex justify-around">
            <div className="pr-3">
              <div>Today's Total</div>
              <span className="text-5xl text-[#00FFFF] font-semibold leading-none">
                {Math.round(totalReading?.maxReading?.cumulativeEnergy ?? 0)}
              </span>
              <div className="text-3xl">kWh</div>
            </div>
            <div className="pl-3">
              <div>Current</div>
              <span className="text-5xl text-[#00FFFF] font-semibold leading-none">
                {Math.round(currentReading?.electricalReading ?? 0)}
              </span>
              <div className="text-3xl">kW</div>
            </div>
          </div>
          <div className="m-auto mt-5 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-4 rounded-xl border border-slate-200/50 dark:border-primary hover:shadow-lg transition-all">
            {realData && realData.length > 0 ? (
              <ChartContainer
                config={chartConfig}
                className="aspect-auto w-full h-[265px]"
              >
                <AreaChart
                  data={realData}
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
                        stopColor="var(--color-cumulativeEnergy)"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-cumulativeEnergy)"
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
                    dataKey="timestamp"
                    tickFormatter={(value) => format(parseISO(value), "HH:mm")}
                    tick={{ fill: "#fff" }}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={1}
                    padding={{ left: 10 }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulativeEnergy"
                    stroke="var(--color-cumulativeEnergy)"
                    fill="url(#gradientConsumption)"
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Loading chart...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
