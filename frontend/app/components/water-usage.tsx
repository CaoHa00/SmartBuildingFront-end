import WaterUsageAnalytics from "./water-usage-analytics"
import WaterUsageChart from "./water-usage-chart"

export default function WaterUsage() {
    return (
        <div className="grid grid-flow-col grid-rows-3 md:row-span-2  md:grid-rows-4">
            <WaterUsageChart />
            <WaterUsageAnalytics />
        </div>
    )
}