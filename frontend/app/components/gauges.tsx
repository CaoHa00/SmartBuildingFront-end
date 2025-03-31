import HumidityGauge from "./humidity-gauge";
import CO2Gauge from "./co2-gauge";
import TempGauge from "./temp-gauge";
import UVGauge from "./uv-gauge";

interface GaugesProps {
  temperature: number;
  uvIndex: number;
  humidity: number;
}

export default function GaugesComponents({
  temperature,
  uvIndex,
  humidity,
}: GaugesProps) {
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      <UVGauge uvIndex={uvIndex} />
      <HumidityGauge humidity={humidity} />
      <TempGauge temperature={temperature} />
      <CO2Gauge electricity={120} />
    </div>
  );
}
