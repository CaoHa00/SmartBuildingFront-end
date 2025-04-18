import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import useHumidTemp from "@/hooks/useHumidTemp";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const chartConfig = {
  temperature: {
    label: "Temperature",
    theme: {
      light: "hsl(var(--chart-1))",
      dark: "hsl(var(--chart-1))"
    }
  },
  humidity: {
    label: "Humidity",
    theme: {
      light: "hsl(var(--chart-2))",
      dark: "hsl(var(--chart-2))"
    }
  }
};

const HumidTempChart = () => {
  const { humidity, temperature, isLoading, isError } = useHumidTemp();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  // Combine and format the data for the chart
  const chartData = humidity.map((h, index) => ({
    time: new Date(h.timestamp).toLocaleTimeString(),
    humidity: h.value,
    temperature: temperature[index]?.value || 0,
  }));

  return (
    <Card className="bg-blue-200">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-blue-800">Temperature & Humidity</CardTitle>
        <CardDescription className="text-blue-800">Real-time monitoring of temperature and humidity levels</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip 
                content={({ active, payload }) => (
                  <ChartTooltipContent 
                    active={active} 
                    payload={payload} 
                    nameKey="dataKey"
                  />
                )}
              />
              <Area 
                type="monotone" 
                dataKey="temperature" 
                stackId="1" 
                stroke="var(--color-temperature)"
                fill="var(--color-temperature)"
                fillOpacity={0.3}
                name="Temperature (°C)"
              />
              <Area 
                type="monotone" 
                dataKey="humidity" 
                stackId="2" 
                stroke="var(--color-humidity)"
                fill="var(--color-humidity)"
                fillOpacity={0.3}
                name="Humidity (%)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HumidTempChart;