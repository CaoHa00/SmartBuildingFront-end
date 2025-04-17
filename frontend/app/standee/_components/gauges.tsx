"use client";

import HumidityGauge from "./humidity-gauge";
import CO2Gauge from "./co2-gauge";
import TempGauge from "./temp-gauge";
import UVGauge from "./uv-gauge";
import useTotalElectricalReading from "@/hooks/use-total-electrical-reading";
import { GaugesProps } from "@/types/gauges";

export default function GaugesComponents({
  temperature,
  uvIndex,
  humidity,
}: GaugesProps) {
  const reading = useTotalElectricalReading();
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      <UVGauge uvIndex={uvIndex} />
      <HumidityGauge humidity={humidity} />
      <TempGauge temperature={temperature} />
      <CO2Gauge electricity={reading?.electricalReading} />
    </div>
  );
}
