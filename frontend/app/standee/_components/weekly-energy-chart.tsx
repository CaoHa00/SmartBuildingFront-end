import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";

export function WeeklyEnergyChart() {
  const chartData = [
    { day: "Monday", energyConsumption: 2887 },
    { day: "Tuesday", energyConsumption: 3223 },
    { day: "Wednesday", energyConsumption: 3671 },
    { day: "Thursday", energyConsumption: 2575 },
    { day: "Friday", energyConsumption: 3921 },
    { day: "Saturday", energyConsumption: 1403 },
    { day: "Sunday", energyConsumption: 985 },
  ];
  const chartConfig = {
    energyConsumption: {
      label: "Energy Consumption",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const maxValue = Math.max(...chartData.map((d) => d.energyConsumption));
  const dynamicTopMargin = Math.min(20, Math.max(10, maxValue / 100));

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart
        data={chartData}
        margin={{ top: dynamicTopMargin, bottom: 0, left: 5, right: 5 }}
      >
        <defs>
          {chartData.map((entry, index) => {
            const value = entry.energyConsumption;
            const stops = [];

            stops.push(<stop key="#16c91a" offset="50%" stopColor="#16c91a" />);

            if (value >= 1500) {
              stops.push(<stop key="yellow" offset="66%" stopColor="yellow" />);
            }
            if (value >= 2250) {
              stops.push(<stop key="orange" offset="82%" stopColor="orange" />);
            }
            if (value > 3000) {
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
          dataKey="energyConsumption"
          fill="url(#energyGradient)"
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
