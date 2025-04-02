"use client";

import { useEffect, useState } from "react";
import ElectricityUsageAnalytics from "./electricity-usage-analytics";
import ElectricityUsageChart from "./electricity-usage-chart";
import axios from "axios";

interface ElectricalValue {
  electricalReading: number;
}

interface ApiResponse {
  live_power: number;
}

export default function ElectricityUsage() {
  const url = "http://10.60.253.172:9092/api/qenergy/site-data";
  const [reading, setReading] = useState<ElectricalValue | null>(null);

  async function fetchElectricalReading() {
    try {
      const response = await axios.get<ApiResponse>(url);
      if (response.data != null) {
        const livePower = response.data["live_power"];
        setReading({ electricalReading: livePower });
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchElectricalReading();
    const interval = setInterval(fetchElectricalReading, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-flow-col md:row-span-2 grid-rows-3">
      <ElectricityUsageChart electricalReading={reading?.electricalReading} />
      <ElectricityUsageAnalytics />
    </div>
  );
}
