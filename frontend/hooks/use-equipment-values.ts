import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { EquipmentValue } from "@/types/equipment";

// Increase polling interval to 30 seconds
const POLLING_INTERVAL = 30000;
// Debounce time to prevent multiple rapid requests
const DEBOUNCE_TIME = 1000;

export const useEquipmentValues = (spaceId: string) => {
  const { toast } = useToast();
  const [values, setValues] = useState<EquipmentValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const fetchEquipmentValues = async () => {
    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce the request
    debounceTimerRef.current = setTimeout(async () => {
      try {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();
        
        setLoading(true);
        setError(null);
        
        const response = await api.get<EquipmentValue[]>(`/spaces/${spaceId}/status`, {
          signal: abortControllerRef.current.signal
        });
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error('Invalid response format');
        }

        setValues(prevValues => {
          const hasChanged = JSON.stringify(prevValues) !== JSON.stringify(response.data);
          return hasChanged ? response.data : prevValues;
        });
      } catch (error: any) {
        // Don't show error for cancelled requests
        if (error.name === 'AbortError') {
          return;
        }
        
        const errorMessage = error.message || "Failed to fetch equipment values";
        setError(errorMessage);
        setValues([]); // Clear values on error
        
        toast({
          variant: "destructive",
          title: "Connection Error",
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_TIME);
  };

  useEffect(() => {
    if (!spaceId) {
      console.warn('No spaceId provided to useEquipmentValues');
      return;
    }

    // Initial fetch
    fetchEquipmentValues();

    // Set up polling with increased interval
    const intervalId = setInterval(fetchEquipmentValues, POLLING_INTERVAL);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Clear any pending debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [spaceId]);

  const getValueByName = (valueName: string) => {
    return values.find(value => value.valueName === valueName)?.valueResponse;
  };

  return {
    values,
    loading,
    error,
    fetchEquipmentValues,
    getValueByName,
  };
};