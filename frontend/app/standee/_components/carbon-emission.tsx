"use client";

import CarbonEmissionAnalytics from "./carbon-emission-analytics";
import CarbonEmissionChart from "./carbon-emission-chart";
import useTotalElectricalReading from "@/hooks/use-total-electrical-reading";

export default function CarbonEmission() {
  const reading = useTotalElectricalReading();

  return (
    <div className="grid grid-flow-col md:row-span-2 grid-rows-3">
      <CarbonEmissionChart electricalReading={reading?.electricalReading} />
      <CarbonEmissionAnalytics />
    </div>
  );
}
