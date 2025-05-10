"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface ElectricalValue {
  id: number;
  timestamp: string;
  cumulativeEnergy: number;
}

export default function useTotalElectricalReading() {
  const [maxReading, setMaxReading] = useState<ElectricalValue | null>(null);
  const [dailyReadings, setDailyReadings] = useState<
    ElectricalValue[] | undefined
  >([]);

  const fetchTotalElectricalReading = async () => {
    try {
      const response = await axios.get<ElectricalValue[]>(
        "http://10.60.253.172:9092/api/qenergy/daily_consumption"
      );

      if (Array.isArray(response.data)) {
        const today = new Date().toISOString().split("T")[0];
        const todayData = response.data.filter((item) =>
          item.timestamp.startsWith(today)
        );

        if (todayData.length > 0) {
          setDailyReadings(todayData);
          const maxItem = todayData.reduce((max, item) =>
            item.cumulativeEnergy > max.cumulativeEnergy ? item : max
          );
          setMaxReading(maxItem);
        }
      }
    } catch (e) {
      console.error("Error fetching electrical reading:", e);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const poll = async () => {
      await fetchTotalElectricalReading();
      timeoutId = setTimeout(poll, 10 * 60 * 1000);
    };

    poll();

    return () => clearTimeout(timeoutId);
  }, []);

  return {
    maxReading,
    dailyReadings,
  };
}
