import ElectricityUsageAnalytics from "./electricity-usage-analytics"
import ElectricityUsageChart from "./electricity-usage-chart"

export default function ElectricityUsage() {
    return (
        <div className="grid grid-flow-col grid-rows-3 md:row-span-2  md:grid-rows-4">
            <ElectricityUsageChart />
            <ElectricityUsageAnalytics />
        </div>
    )
}