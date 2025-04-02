"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Legend,
} from "recharts";

const data = [
  { day: "Mon", usage: 4.2 },
  { day: "Tue", usage: 3.8 },
  { day: "Wed", usage: 4.5 },
  { day: "Thu", usage: 4.1 },
  { day: "Fri", usage: 3.9 },
  { day: "Sat", usage: 2.8 },
  { day: "Sun", usage: 2.5 },
];

export function ElectricityChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis unit="kWh" />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Usage:</span>
                    <span>{payload[0].value} kWh</span>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar 
          dataKey="usage" 
          fill="#3b82f6" 
          opacity={0.6} 
          name="Daily Usage"
        />
        <Line
          type="monotone"
          dataKey="usage"
          stroke="#1d4ed8"
          strokeWidth={2}
          dot={{ strokeWidth: 2 }}
          name="Usage Trend"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
