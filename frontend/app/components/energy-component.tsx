import EnergySave from "./energy-save";
import EnergyUser from "./energy-user";

export default function EnergyComponent() {
  return (
    <div className="bg-muted/40 flex rounded-xl aspect-auto px-2 md:px-5 py-2 md:py-3 mb-4">
      <EnergyUser />
      <EnergySave />
    </div>
  );
}
