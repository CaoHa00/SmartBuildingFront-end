import WaterUsageAnalytics from "./water-usage-analytics";
import WaterUsageChart from "./water-usage-chart";

export default function WaterUsage() {
  return (
    <div className="grid grid-flow-col md:row-span-2 grid-rows-4">
      <WaterUsageChart />
      <WaterUsageAnalytics />
    </div>
  );
}
