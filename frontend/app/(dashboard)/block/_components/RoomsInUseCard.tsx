"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  ChartConfig,
  ChartContainer,
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

const chartData = [
  { type: "inUse", rooms: 40, fill: "var(--color-inUse)" },
  { type: "vacant", rooms: 29, fill: "var(--color-vacant)" },
];

const chartConfig = {
  rooms: {
    label: "Rooms",
  },
  inUse: {
    label: "In use",
    color: "#00FFFF",
  },
  vacant: {
    label: "Vacant",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function RoomsInUseCard() {
  const id = "pie-interactive";
  const [activeType, setActiveType] = React.useState(chartData[0].type);
  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.type === activeType),
    [activeType]
  );
  const types = React.useMemo(() => chartData.map((item) => item.type), []);
  return (
    <>
      <Card className="bg-card">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl text-card-foreground">
            <div className="flex justify-between">
              <div>ROOMS IN USE</div>
              <div className="pt-1">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
          </CardTitle>
          <div className="flex justify-between">
            <CardDescription>BLOCK 8</CardDescription>
            <Select value={activeType} onValueChange={setActiveType}>
              <SelectTrigger
                className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {types.map((key) => {
                  const config = chartConfig[key as keyof typeof chartConfig];
                  if (!config) {
                    return null;
                  }
                  return (
                    <SelectItem
                      key={key}
                      value={key}
                      className="rounded-lg [&_span]:flex"
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className="flex h-3 w-3 shrink-0 rounded-sm"
                          style={{
                            backgroundColor: `var(--color-${key})`,
                          }}
                        />
                        {config?.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="pt-3 pb-3">
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto max-w-[300px]"
          >
            <PieChart margin={{ top: 15, bottom: 15, left: 0, right: 0 }}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="rooms"
                nameKey="type"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {chartData[activeIndex].rooms.toLocaleString()}/69
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Rooms
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
