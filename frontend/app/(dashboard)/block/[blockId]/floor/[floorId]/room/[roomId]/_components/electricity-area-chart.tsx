"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ChartDataPoint {
  timestamp: string;
  current: number;
  power: number;
  voltage: number;
}

export function ElectricityAreaChart() {
  const params = useParams();
  const { values, loading: isLoading } = useEquipmentValues(params.roomId as string);
  const isMobile = useIsMobile();
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (values.length > 0) {
      const electricValues = values.filter(v => v.equipmentName.toLowerCase().includes('electric'));
      
      const current = electricValues.find(v => v.valueName === "electricCurrent")?.valueResponse || 0;
      const power = electricValues.find(v => v.valueName === "active-power")?.valueResponse || 0;
      const voltage = electricValues.find(v => v.valueName === "voltage")?.valueResponse || 0;

      const now = new Date();
      const timeStr = now.toLocaleTimeString();

      setChartData(prev => {
        const newData = [...prev, { timestamp: timeStr, current, power, voltage }];
        return newData.slice(-20); // Keep last 20 points
      });
    }
  }, [values]);

  return (
    <Card
      className={`w-full h-full relative rounded-xl mx-auto bg-blue-800 shadow-xl 
     dark:bg-blue-950 text-neutral-100 ${isMobile ? "p-2" : "p-4"}`}
    >
      <CardHeader className={`${isMobile ? "px-2 py-3" : ""} pb-2`}>
        <CardTitle
          className={`flex items-center gap-2 font-bold ${
            isMobile ? "text-base" : "text-xl"
          }`}
        >
          Real-time Electric Measurements <Zap className="text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" opacity={0.1} />
            <XAxis 
              dataKey="timestamp" 
              stroke="#fff"
              tick={{ fill: "#fff" }}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#fff"
              tick={{ fill: "#fff" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#1e40af", 
                border: "none",
                borderRadius: "8px",
                color: "#fff"
              }}
            />
            <Area 
              type="monotone" 
              dataKey="power" 
              name="Power (kW)"
              stroke="#22c55e" 
              fill="#22c55e" 
              fillOpacity={0.3}
            />
            <Area 
              type="monotone" 
              dataKey="current" 
              name="Current (A)"
              stroke="#0ea5e9" 
              fill="#0ea5e9" 
              fillOpacity={0.3}
            />
            <Area 
              type="monotone" 
              dataKey="voltage" 
              name="Voltage (V)"
              stroke="#2563eb" 
              fill="#2563eb" 
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}