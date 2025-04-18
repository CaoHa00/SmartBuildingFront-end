import { useState, useCallback } from 'react';
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Block, NewBlockData, NewFloorData, NewRoomData, NewEquipmentData } from '@/types/block-management';

export function useBlockManagement() {
  const { toast } = useToast();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);
  const [equipmentStates, setEquipmentStates] = useState<Record<number, boolean>>({});

  const fetchBlocks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get<Block[]>("/block");
      setBlocks(response.data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch blocks",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const handleAddBlock = async (blockData: NewBlockData) => {
    try {
      await api.post("/block", blockData);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create block",
      });
      return false;
    }
  };

  const handleUpdateBlock = async (blockId: number, blockData: NewBlockData) => {
    try {
      await api.put(`/block/${blockId}`, blockData);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update block",
      });
      return false;
    }
  };

  const handleDeleteBlock = async (blockId: number) => {
    try {
      await api.delete(`/block/${blockId}`);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete block",
      });
      return false;
    }
  };

  const handleAddFloor = async (floorData: NewFloorData) => {
    try {
      await api.post("/floor", floorData);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create floor",
      });
      return false;
    }
  };

  const handleUpdateFloor = async (floorId: number, floorData: NewFloorData) => {
    try {
      await api.put(`/floor/${floorId}`, floorData);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update floor",
      });
      return false;
    }
  };

  const handleDeleteFloor = async (floorId: number) => {
    try {
      await api.delete(`/floor/${floorId}`);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete floor",
      });
      return false;
    }
  };

  const handleAddRoom = async (roomData: NewRoomData) => {
    try {
      await api.post("/room", roomData);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create room",
      });
      return false;
    }
  };

  const handleUpdateRoom = async (roomId: number, roomData: NewRoomData) => {
    try {
      if (!roomId) {
        throw new Error('Room ID is required');
      }
      if (!roomData.roomName?.trim()) {
        throw new Error('Room name is required');
      }
      if (!roomData.floorId) {
        throw new Error('Floor ID is required');
      }

      console.log('Updating room:', { roomId, roomData });
      
      const response = await api.put(`/room/${roomId}`, {
        roomName: roomData.roomName.trim(),
        floorId: roomData.floorId
      });
      
      if (response.status === 200) {
        await fetchBlocks();
        toast({
          title: "Success",
          description: "Room updated successfully"
        });
        return true;
      }
      
      throw new Error(response.data?.message || 'Failed to update room');
    } catch (error: any) {
      console.error('Room update error:', {
        error,
        roomId,
        roomData,
        response: error.response,
        status: error.response?.status
      });
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Failed to update room';
        
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage
      });
      return false;
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    try {
      await api.delete(`/room/${roomId}`);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete room",
      });
      return false;
    }
  };

  const handleAddEquipment = async (equipmentData: NewEquipmentData) => {
    try {
      if (!equipmentData.categoryId) {
        throw new Error('Category is required');
      }
      await api.post("/equipment", equipmentData);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create equipment",
      });
      return false;
    }
  };

  const handleUpdateEquipment = async (equipmentId: number, equipmentData: NewEquipmentData) => {
    try {
      if (!equipmentId) {
        throw new Error('Equipment ID is required');
      }
      if (!equipmentData.categoryId) {
        throw new Error('Category is required');
      }

      const response = await api.put(`/equipment/${equipmentId}`, equipmentData);
      
      if (response.status === 200) {
        await fetchBlocks();
        toast({
          title: "Success",
          description: "Equipment updated successfully"
        });
        return true;
      }

      throw new Error(response.data?.message || 'Failed to update equipment');
    } catch (error: any) {
      console.error('Equipment update error:', {
        error,
        equipmentId,
        equipmentData,
        response: error.response,
        status: error.response?.status
      });
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Failed to update equipment';
        
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage
      });
      return false;
    }
  };

  const handleDeleteEquipment = async (equipmentId: number) => {
    try {
      await api.delete(`/equipment/${equipmentId}`);
      await fetchBlocks();
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete equipment",
      });
      return false;
    }
  };

  const handleEquipmentControl = async (equipmentId: number, value: number) => {
    try {
      const newState = !equipmentStates[equipmentId];
      const controlValue = newState ? 0 : 1;

      const response = await api.post('http://10.60.253.172:9090/api/aqara/light-control', null, {
        params: {
          equipmentId,
          value: controlValue,
          buttonPosition: 2
        },
        timeout: 5000
      });

      if (response.status === 200) {
        setEquipmentStates(prev => ({ ...prev, [equipmentId]: newState }));
        toast({
          title: "Success",
          description: `Equipment turned ${newState ? "On" : "Off"} successfully`,
        });
        return true;
      }
      throw new Error('Failed to control equipment');
    } catch (error: any) {
      const errorMessage = error.response?.status === 400
        ? 'Invalid request. Please check equipment status.'
        : error.code === 'ECONNABORTED'
        ? 'Connection timeout. Please check your network.'
        : error.message === 'Network Error'
        ? 'Network error. Please check your connection to the device.'
        : 'Failed to control equipment. Please try again.';

      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      return false;
    }
  };

  return {
    blocks,
    loading,
    equipmentStates,
    fetchBlocks,
    handleAddBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    handleAddFloor,
    handleUpdateFloor,
    handleDeleteFloor,
    handleAddRoom,
    handleUpdateRoom,
    handleDeleteRoom,
    handleAddEquipment,
    handleUpdateEquipment,
    handleDeleteEquipment,
    handleEquipmentControl
  };
}