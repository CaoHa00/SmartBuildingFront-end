"use client";

import { CartesianGrid, Line, ComposedChart, XAxis, Bar } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Monday", energy: 250, carbon: 125 },
  { day: "Tuesday", energy: 280, carbon: 140 },
  { day: "Wednesday", energy: 300, carbon: 150 },
  { day: "Thursday", energy: 270, carbon: 135 },
  { day: "Friday", energy: 290, carbon: 145 },
  { day: "Saturday", energy: 220, carbon: 110 },
  { day: "Sunday", energy: 200, carbon: 100 },
];

const chartConfig = {
  energy: {
    label: "Energy (kWh)",
    color: "hsl(var(--chart-1))",
  },
  carbon: {
    label: "Carbon Emissions (kg CO₂)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CO2EmissionChart() {
  return (
    <ChartContainer config={chartConfig}>
      <ComposedChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar
          dataKey="energy"
          fill="var(--color-energy)"
          radius={[4, 4, 0, 0]}
        />
        <Line
          dataKey="carbon"
          type="monotone"
          stroke="var(--color-carbon)"
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
