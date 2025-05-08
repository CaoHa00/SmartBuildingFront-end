"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { type: "big", rooms: 6, fill: "var(--color-big)" },
  { type: "small", rooms: 6, fill: "var(--color-small)" },
];

const chartConfig = {
  rooms: {
    label: "Rooms",
  },
  big: {
    label: "Big Rooms",
    color: "#00FFFF",
  },
  small: {
    label: "Small rooms",
    color: "#205BCC",
  },
} satisfies ChartConfig;

export default function TotalRoom() {
  const totalRooms = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.rooms, 0);
  }, []);
  return (
    <>
      <Card className="bg-card">
        <CardHeader className="pb-0">
          <CardTitle className="text-xl text-card-foreground">
            <div className="flex justify-between">
              <div>TOTAL ROOMS</div>
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
          <CardDescription>FLOOR 1</CardDescription>
        </CardHeader>
        <CardContent className="pt-3 pb-3">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[350px]"
          >
            <PieChart>
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
                            className="fill-foreground text-5xl font-bold"
                          >
                            {totalRooms.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            ROOMS
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
        <CardFooter className="flex-col gap-2 text-2xl">
          <div className="flex items-center gap-2 font-medium leading-none">
            TOTAL TYPES OF ROOMS IN FLOOR 1
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total Rooms of Floor 1 (Block 8)
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
