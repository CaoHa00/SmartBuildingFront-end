import { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { EquipmentValue } from "@/types/equipment";

export const useEquipmentValues = (spaceId: string) => {
  const { toast } = useToast();
  const [values, setValues] = useState<EquipmentValue[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEquipmentValues = async () => {
    try {
      setLoading(true);
      const response = await api.get<EquipmentValue[]>(`/spaces/${spaceId}/status`);
      setValues(prevValues => {
        // Only update if values have changed
        const hasChanged = JSON.stringify(prevValues) !== JSON.stringify(response.data);
        return hasChanged ? response.data : prevValues;
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch equipment values",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchEquipmentValues();

    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchEquipmentValues, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [spaceId]);

  const getValueByName = (valueName: string) => {
    return values.find(value => value.valueName === valueName)?.valueResponse;
  };

  return {
    values,
    loading,
    fetchEquipmentValues,
    getValueByName,
  };
};