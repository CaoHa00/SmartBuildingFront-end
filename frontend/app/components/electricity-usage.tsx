import ElectricityUsageAnalytics from "./electricity-usage-analytics";
import ElectricityUsageChart from "./electricity-usage-chart";

export default function ElectricityUsage() {
  return (
    <div className="grid grid-flow-col md:row-span-2 grid-rows-4">
      <ElectricityUsageChart />
      <ElectricityUsageAnalytics />
    </div>
  );
}
