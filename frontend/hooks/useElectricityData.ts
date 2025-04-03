import { useState, useEffect } from 'react';
import { ElectricityData } from '@/types/electricity';
import axios from 'axios';

export function useElectricityData() {
  const [data, setData] = useState<ElectricityData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post<ElectricityData>(
          `http://10.60.253.172:9090/api/tuya/currentValue?equipmentId=12`,
        );
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, isLoading, error };
}
