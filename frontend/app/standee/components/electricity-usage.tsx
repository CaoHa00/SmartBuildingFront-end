"use client";

import useTotalElectricalReading from "@/hooks/useTotalElectricalReading";
import ElectricityUsageAnalytics from "./electricity-usage-analytics";
import ElectricityUsageChart from "./electricity-usage-chart";
import useCurrentElectricalReading from "@/hooks/useCurrentElectricalReading";

export default function ElectricityUsage() {
  const currentReading = useCurrentElectricalReading();
  const totalReading = useTotalElectricalReading();

  return (
    <div className="grid grid-flow-col md:row-span-2 grid-rows-3">
      <ElectricityUsageChart
        currentElectricalReading={currentReading?.electricalReading}
        totalElectricalReading={totalReading?.electricalReading}
      />
      <ElectricityUsageAnalytics />
    </div>
  );
}
