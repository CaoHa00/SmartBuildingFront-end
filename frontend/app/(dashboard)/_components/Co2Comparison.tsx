"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// const chartData = [
//   { date: "2025-04-01", emission: 222, reduction: 150 },
//   { date: "2025-04-02", emission: 97, reduction: 180 },
//   { date: "2025-04-03", emission: 167, reduction: 120 },
//   { date: "2025-04-04", emission: 242, reduction: 260 },
//   { date: "2025-04-05", emission: 373, reduction: 290 },
//   { date: "2025-04-06", emission: 301, reduction: 340 },
//   { date: "2025-04-07", emission: 245, reduction: 180 },
//   { date: "2025-04-08", emission: 409, reduction: 320 },
//   { date: "2025-04-09", emission: 59, reduction: 110 },
//   { date: "2025-04-10", emission: 261, reduction: 190 },
//   { date: "2025-04-11", emission: 327, reduction: 350 },
//   { date: "2025-04-12", emission: 292, reduction: 210 },
//   { date: "2025-04-13", emission: 342, reduction: 380 },
//   { date: "2025-04-14", emission: 137, reduction: 220 },
//   { date: "2025-04-15", emission: 120, reduction: 170 },
//   { date: "2025-04-16", emission: 138, reduction: 190 },
//   { date: "2025-04-17", emission: 446, reduction: 360 },
//   { date: "2025-04-18", emission: 364, reduction: 410 },
//   { date: "2025-04-19", emission: 243, reduction: 180 },
//   { date: "2025-04-20", emission: 89, reduction: 150 },
//   { date: "2025-04-21", emission: 137, reduction: 200 },
//   { date: "2025-04-22", emission: 224, reduction: 170 },
//   { date: "2025-04-23", emission: 138, reduction: 230 },
//   { date: "2025-04-24", emission: 387, reduction: 290 },
//   { date: "2025-04-25", emission: 215, reduction: 250 },
//   { date: "2025-04-26", emission: 75, reduction: 130 },
//   { date: "2025-04-27", emission: 383, reduction: 420 },
//   { date: "2025-04-28", emission: 122, reduction: 180 },
//   { date: "2025-04-29", emission: 315, reduction: 240 },
//   { date: "2025-04-30", emission: 454, reduction: 380 },
//   { date: "2025-05-01", emission: 165, reduction: 220 },
//   { date: "2025-05-02", emission: 293, reduction: 310 },
//   { date: "2025-05-03", emission: 247, reduction: 190 },
//   { date: "2025-05-04", emission: 385, reduction: 420 },
//   { date: "2025-05-05", emission: 481, reduction: 390 },
//   { date: "2025-05-06", emission: 498, reduction: 520 },
//   { date: "2025-05-07", emission: 388, reduction: 300 },
//   { date: "2025-05-08", emission: 149, reduction: 210 },
//   { date: "2025-05-09", emission: 227, reduction: 180 },
//   { date: "2025-05-10", emission: 293, reduction: 330 },
//   { date: "2025-05-11", emission: 335, reduction: 270 },
//   { date: "2025-05-12", emission: 197, reduction: 240 },
//   { date: "2025-05-13", emission: 197, reduction: 160 },
//   { date: "2025-05-14", emission: 448, reduction: 490 },
//   { date: "2025-05-15", emission: 473, reduction: 380 },
//   { date: "2025-05-16", emission: 338, reduction: 400 },
//   { date: "2025-05-17", emission: 499, reduction: 420 },
//   { date: "2025-05-18", emission: 315, reduction: 350 },
//   { date: "2025-05-19", emission: 235, reduction: 180 },
//   { date: "2025-05-20", emission: 177, reduction: 230 },
//   { date: "2025-05-21", emission: 82, reduction: 140 },
//   { date: "2025-05-22", emission: 81, reduction: 120 },
//   { date: "2025-05-23", emission: 252, reduction: 290 },
//   { date: "2025-05-24", emission: 294, reduction: 220 },
//   { date: "2025-05-25", emission: 201, reduction: 250 },
//   { date: "2025-05-26", emission: 213, reduction: 170 },
//   { date: "2025-05-27", emission: 420, reduction: 460 },
//   { date: "2025-05-28", emission: 233, reduction: 190 },
//   { date: "2025-05-29", emission: 78, reduction: 130 },
//   { date: "2025-05-30", emission: 340, reduction: 280 },
//   { date: "2025-05-31", emission: 178, reduction: 230 },
//   { date: "2025-06-01", emission: 178, reduction: 200 },
//   { date: "2025-06-02", emission: 470, reduction: 410 },
//   { date: "2025-06-03", emission: 103, reduction: 160 },
//   { date: "2025-06-04", emission: 439, reduction: 380 },
//   { date: "2025-06-05", emission: 88, reduction: 140 },
//   { date: "2025-06-06", emission: 294, reduction: 250 },
//   { date: "2025-06-07", emission: 323, reduction: 370 },
//   { date: "2025-06-08", emission: 385, reduction: 320 },
//   { date: "2025-06-09", emission: 438, reduction: 480 },
//   { date: "2025-06-10", emission: 155, reduction: 200 },
//   { date: "2025-06-11", emission: 92, reduction: 150 },
//   { date: "2025-06-12", emission: 492, reduction: 420 },
//   { date: "2025-06-13", emission: 81, reduction: 130 },
//   { date: "2025-06-14", emission: 426, reduction: 380 },
//   { date: "2025-06-15", emission: 307, reduction: 350 },
//   { date: "2025-06-16", emission: 371, reduction: 310 },
//   { date: "2025-06-17", emission: 475, reduction: 520 },
//   { date: "2025-06-18", emission: 107, reduction: 170 },
//   { date: "2025-06-19", emission: 341, reduction: 290 },
//   { date: "2025-06-20", emission: 408, reduction: 450 },
//   { date: "2025-06-21", emission: 169, reduction: 210 },
//   { date: "2025-06-22", emission: 317, reduction: 270 },
//   { date: "2025-06-23", emission: 480, reduction: 530 },
//   { date: "2025-06-24", emission: 132, reduction: 180 },
//   { date: "2025-06-25", emission: 141, reduction: 190 },
//   { date: "2025-06-26", emission: 434, reduction: 380 },
//   { date: "2025-06-27", emission: 448, reduction: 490 },
//   { date: "2025-06-28", emission: 149, reduction: 200 },
//   { date: "2025-06-29", emission: 103, reduction: 160 },
//   { date: "2025-06-30", emission: 446, reduction: 400 },
// ];

const chartData = [
  { type: "Emission", total: 1327, fill: "#965fd9" },
  { type: "Reduction", total: 854, fill: "var(--color-reduction)" },
];

const chartConfig = {
  emission: {
    label: "Emission",
    color: "#00FFFF",
  },
  reduction: {
    label: "Reduction",
    color: "#2DF5B2",
  },
} satisfies ChartConfig;

export default function Co2Comparison() {
  // const [timeRange, setTimeRange] = React.useState("90d");

  // const filteredData = useMemo(() => {
  //   const now = new Date();
  //   let startDate = new Date();

  //   if (timeRange === "90d") {
  //     startDate.setDate(now.getDate() - 90);
  //   } else if (timeRange === "30d") {
  //     startDate.setDate(now.getDate() - 30);
  //   } else if (timeRange === "7d") {
  //     startDate.setDate(now.getDate() - 7);
  //   }

  //   return chartData.filter((entry) => {
  //     const entryDate = new Date(entry.date);
  //     return entryDate >= startDate && entryDate <= now;
  //   });
  // }, [timeRange, chartData]);

  return (
    <>
      <Card className="bg-card">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl text-card-foreground">
            <div className="flex justify-between">
              <div>CO₂ COMPARISON</div>
              <div className="font-normal">
                {/* <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger
                    className="w-[160px] rounded-lg sm:ml-auto"
                    aria-label="Select a value"
                  >
                    <SelectValue placeholder="Last 3 months" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="90d" className="rounded-lg">
                      Last 3 months
                    </SelectItem>
                    <SelectItem value="30d" className="rounded-lg">
                      Last 30 days
                    </SelectItem>
                    <SelectItem value="7d" className="rounded-lg">
                      Last 7 days
                    </SelectItem>
                  </SelectContent>
                </Select> */}
              </div>
            </div>
          </CardTitle>
          <div className="flex justify-between">
            {/* <CardDescription>...</CardDescription> */}
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          {/* <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[205px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillEmission" x1="0" y1="0" x2="0" y2="1">
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
                <linearGradient id="fillReduction" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-reduction)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-reduction)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      const formattedDate = new Date(value).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      );
                      return (
                        <div style={{ color: "black" }}>{formattedDate}</div>
                      );
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="emission"
                type="natural"
                fill="url(#fillEmission)"
                stroke="var(--color-emission)"
                stackId="a"
              />
              <Area
                dataKey="reduction"
                type="natural"
                fill="url(#fillReduction)"
                stroke="var(--color-reduction)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer> */}
          {/* <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[205px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={filteredData}
              margin={{ left: 10, right: 10 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      const formattedDate = new Date(value).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      );
                      return (
                        <div style={{ color: "black" }}>{formattedDate}</div>
                      );
                    }}
                    indicator="dot"
                  />
                }
              />
              <Bar dataKey="emission" fill="var(--color-emission)" radius={4} />
              <Bar
                dataKey="reduction"
                fill="var(--color-reduction)"
                radius={4}
              />
            </BarChart>
          </ChartContainer> */}
          <div className="flex justify-between">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[205px] w-full pr-3"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  right: 28,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="type"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value}
                  hide
                />
                <XAxis dataKey="total" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="total" layout="vertical" radius={4}>
                  <LabelList
                    dataKey="type"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={18}
                  />
                  <LabelList
                    dataKey="total"
                    position="right"
                    offset={8}
                    fontSize={16}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
            <div className="text-center flex justify-center align-center w-3/4 border-l ">
              <p className="mt-16 ml-4">
                We need{" "}
                <span className="font-bold text-[#00FFFF] text-xl">50</span>{" "}
                more plants to remove the CO2 deficit
                {/* Messages */}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
