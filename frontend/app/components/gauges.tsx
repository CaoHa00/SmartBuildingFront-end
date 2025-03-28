import HumidityGauge from "./humidity-gauge";
import SunGauge from "./sun-gauge";
import TempGauge from "./temp-gauge";
import UVGauge from "./uv-gauge";

interface GaugesProps {
  temperature: number;
  uvIndex: number;
  humidity: number;
  sunrise: string;
  sunset: string;
}

export default function GaugesComponents({
  temperature,
  uvIndex,
  humidity,
  sunrise,
  sunset,
}: GaugesProps) {
  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      <UVGauge uvIndex={uvIndex} />
      <HumidityGauge humidity={humidity} />
      <TempGauge temperature={temperature} />
      <SunGauge sunrise={sunrise} sunset={sunset} />
    </div>
  );
}
