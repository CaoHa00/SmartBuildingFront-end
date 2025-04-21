import EnergyUser from "./energy-user";
import CO2Usage from "./co2-usage";

export default function EnergyComponent() {
  return (
    <div className="flex justify-around">
      <div className="bg-[#5e83ba] w-full flex rounded-xl aspect-auto px-2 md:px-5 py-2 md:py-3 mr-[0.5rem]">
        <EnergyUser />
      </div>
      <div className="bg-[#5e83ba] w-full flex rounded-xl aspect-auto px-2 md:px-5 py-2 md:py-3">
        <CO2Usage />
      </div>
    </div>
  );
}
