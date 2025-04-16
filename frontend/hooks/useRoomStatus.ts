import { useState, useEffect } from 'react';
import { api } from '@/lib/axios';

interface RoomStatusValue {
  valueResponse: number;
  valueName: string;
}

export interface RoomStatus {
  temperature: number;
  humidity: number;
  lightStatus: boolean[];
  current: number;
  activePower: number;
  totalPower: number;
  voltage: number;
  isAvailable: boolean;
  hasEquipment: boolean;
}

export const useRoomStatus = (roomId: string) => {
  const [status, setStatus] = useState<RoomStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomStatus = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<RoomStatusValue[]>(`/room/${roomId}/status`);
        
        // Check if response data is empty or invalid
        if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
          // Set default values for a room without equipment
          setStatus({
            temperature: 0,
            humidity: 0,
            lightStatus: [],
            current: 0,
            activePower: 0,
            totalPower: 0,
            voltage: 0,
            isAvailable: true,
            hasEquipment: false
          });
          return;
        }

        const processedData: RoomStatus = {
          temperature: 0,
          humidity: 0,
          lightStatus: [],
          current: 0,
          activePower: 0,
          totalPower: 0,
          voltage: 0,
          isAvailable: true,
          hasEquipment: true
        };

        let hasValidData = false;

        response.data.forEach((item) => {
          if (!item || typeof item.valueResponse !== 'number' || typeof item.valueName !== 'string') {
            console.warn('Invalid item in room status response:', item);
            return;
          }

          hasValidData = true;
          switch (item.valueName) {
            case 'temperature':
              processedData.temperature = item.valueResponse / 100;
              break;
            case 'humidity':
              processedData.humidity = item.valueResponse / 100;
              break;
            case 'light status':
              processedData.lightStatus.push(item.valueResponse === 1);
              break;
            case 'current':
              processedData.current = item.valueResponse;
              break;
            case 'active power':
              processedData.activePower = item.valueResponse;
              break;
            case 'total power':
              processedData.totalPower = item.valueResponse;
              break;
            case 'voltage':
              processedData.voltage = item.valueResponse;
              break;
          }
        });

        if (!hasValidData) {
          // Set default values if no valid data was found
          processedData.hasEquipment = false;
        }

        // Room is considered unavailable if any light is on
        processedData.isAvailable = !processedData.lightStatus.some(status => status);
        
        setStatus(processedData);
        setError(null);
      } catch (err) {
        // Set default values on error
        setStatus({
          temperature: 0,
          humidity: 0,
          lightStatus: [],
          current: 0,
          activePower: 0,
          totalPower: 0,
          voltage: 0,
          isAvailable: true,
          hasEquipment: false
        });
        console.error('Room status fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomStatus();
    const interval = setInterval(fetchRoomStatus, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [roomId]);

  return { status, isLoading, error };
};