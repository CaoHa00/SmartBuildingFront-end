import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

interface LogValue {
  logValueId: number;
  timeStamp: number;
  equipmentId: number;
  value: {
    valueId: number;
    valueName: string;
  };
  valueResponse: number;
}

const FIFTEEN_MINUTES = 1000 * 60 * 15; // 15 minutes in milliseconds

const fetchLogValue = async (valueId: number) => {
  const response = await api.get<LogValue[]>(`http://10.60.253.172:9090/api/logValue?valueId=${valueId}`);
  return response.data;
};

const useHumidTemp = () => {
  const humidityQuery = useQuery({
    queryKey: ['humidity'],
    queryFn: () => fetchLogValue(2),
    refetchInterval: FIFTEEN_MINUTES,
    staleTime: FIFTEEN_MINUTES, // Data won't be considered stale for 15 minutes
  });

  const temperatureQuery = useQuery({
    queryKey: ['temperature'],
    queryFn: () => fetchLogValue(1),
    refetchInterval: FIFTEEN_MINUTES,
    staleTime: FIFTEEN_MINUTES, // Data won't be considered stale for 15 minutes
  });

  return {
    humidity: humidityQuery.data?.map(item => ({
      value: item.valueResponse / 100, // Convert to actual percentage
      timestamp: new Date(item.timeStamp).toISOString(),
    })) || [],
    temperature: temperatureQuery.data?.map(item => ({
      value: item.valueResponse / 100, // Convert to actual temperature
      timestamp: new Date(item.timeStamp).toISOString(),
    })) || [],
    isLoading: humidityQuery.isLoading || temperatureQuery.isLoading,
    isError: humidityQuery.isError || temperatureQuery.isError,
    error: humidityQuery.error || temperatureQuery.error,
  };
};

export default useHumidTemp;