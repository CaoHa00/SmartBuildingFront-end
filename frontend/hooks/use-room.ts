import { NewRoomData } from "@/types/block-management";
import { toast } from "./use-toast";
import { api } from "@/lib/axios";

const handleAddRoom = async (roomData: NewRoomData) => {
  try {
    if (!roomData.roomName?.trim()) {
      throw new Error('Room name is required');
    }
    if (!roomData.floorId) {
      throw new Error('Floor ID is required');
    }

    console.log('Creating room:', roomData);
    
    const response = await api.post("/room", {
      roomName: roomData.roomName.trim(),
      floorId: roomData.floorId
    });
    
    if (response.status === 200 || response.status === 201) {
      toast({
        title: "Success",
        description: "Room created successfully"
      });
      return true;
    }
    
    throw new Error(response.data?.message || 'Failed to create room');
  } catch (error: any) {
    console.error('Room creation error:', {
      error,
      roomData,
      response: error.response,
      status: error.response?.status
    });
    
    const errorMessage = error.response?.data?.message 
      || error.message 
      || 'Failed to create room';
      
    toast({
      variant: "destructive",
      title: "Error",
      description: errorMessage
    });
    return false;
  }
};