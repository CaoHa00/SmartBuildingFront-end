import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";

export function WeeklyCo2EmissionChart() {
  const chartData = [
    { day: "Monday", co2Emission: 0.92 },
    { day: "Tuesday", co2Emission: 1.09 },
    { day: "Wednesday", co2Emission: 1.24 },
    { day: "Thursday", co2Emission: 0.77 },
    { day: "Friday", co2Emission: 1.48 },
    { day: "Saturday", co2Emission: 0.47 },
    { day: "Sunday", co2Emission: 0.29 },
  ];
  const chartConfig = {
    co2Emission: {
      label: "CO₂ Emission",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const maxValue = Math.max(...chartData.map((d) => d.co2Emission));
  const dynamicTopMargin = Math.min(20, Math.max(10, maxValue * 10));

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart
        data={chartData}
        margin={{ top: dynamicTopMargin, bottom: 0, left: 5, right: 5 }}
      >
        <defs>
          {chartData.map((entry, index) => {
            const value = entry.co2Emission;
            const stops = [];

            stops.push(<stop key="#16c91a" offset="25%" stopColor="#16c91a" />);

            if (value >= 0.33) {
              stops.push(<stop key="yellow" offset="50%" stopColor="yellow" />);
            }
            if (value >= 0.66) {
              stops.push(<stop key="orange" offset="75%" stopColor="orange" />);
            }
            if (value > 1) {
              stops.push(<stop key="red" offset="100%" stopColor="red" />);
            }

            return (
              <linearGradient
                key={`grad-${index}`}
                id={`grad-${index}`}
                x1="0"
                y1="1"
                x2="0"
                y2="0"
              >
                {stops}
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={2}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar
          dataKey="co2Emission"
          fill="var(--color-co2Emission)"
          radius={4}
          label={{
            position: "top",
            fill: "#fff",
            fontSize: 14,
          }}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#grad-${index})`} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
