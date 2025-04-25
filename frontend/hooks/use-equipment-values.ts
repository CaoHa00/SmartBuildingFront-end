import { useState } from "react";
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
      setValues(response.data);
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