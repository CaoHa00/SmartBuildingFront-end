import { useEffect, useState } from "react";
import axios from "axios";

interface ElectricalValue {
  electricalReading: number;
}

interface ApiResponse {
  live_power: number;
}

export default function useCurrentElectricalReading() {
  const [reading, setReading] = useState<ElectricalValue | null>(null);

  const fetchCurrentElectricalReading = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://10.60.253.172:9092/api/qenergy/site-data"
      );
      if (response.data) {
        const livePower = response.data["live_power"];
        setReading({ electricalReading: livePower });
      }
    } catch (e) {
      console.error("Error fetching electrical reading:", e);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const poll = async () => {
      await fetchCurrentElectricalReading();
      timeoutId = setTimeout(poll, 10 * 60 * 1000);
    };

    poll();

    return () => clearTimeout(timeoutId);
  }, []);

  return reading;
}
