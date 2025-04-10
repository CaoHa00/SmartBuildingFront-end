import HumidityGauge from "./humidity-gauge";
import SunGauge from "./sun-gauge";
import TempGauge from "./temp-gauge";
import UVGauge from "./uv-gauge";

export default function GaugesComponents() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <UVGauge />
      <HumidityGauge />
      <TempGauge />
      <SunGauge />
    </div>
  );
}
