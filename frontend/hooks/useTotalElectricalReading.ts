"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface ElectricalValue {
  electricalReading: number;
}

interface ApiResponse {
  total_consumption: number;
}

export default function useTotalElectricalReading() {
  const [reading, setReading] = useState<ElectricalValue | null>(null);

  const fetchTotalElectricalReading = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://10.60.253.172:9090/api/qenergy/cost_consumption_summary"
      );
      if (response.data) {
        const totalPower = response.data["total_consumption"];
        setReading({ electricalReading: totalPower });
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

  return reading;
}
