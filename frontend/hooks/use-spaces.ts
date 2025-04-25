import { useState } from "react";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Space, NewSpaceData } from "@/types/space";
import axios, { AxiosError } from "axios";

// Cache for storing space data
let spacesCache: Space[] = [];

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const useSpaces = () => {
  const { toast } = useToast();
  const [spaces, setSpaces] = useState<Space[]>(spacesCache);
  const [loading, setLoading] = useState(spacesCache.length === 0);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchWithRetry = async (retryCount = 0): Promise<Space[]> => {
    try {
      const response = await api.get<Space[]>("/spaces/all");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if ((axiosError.code === "ECONNABORTED" || axiosError.message.includes("timeout")) && retryCount < MAX_RETRIES) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          return fetchWithRetry(retryCount + 1);
        }
      }
      throw error;
    }
  };

  const fetchSpaces = async () => {
    // If we already have data in the cache, use it
    if (spacesCache.length > 0) {
      setSpaces(spacesCache);
      setLoading(false);
      return spacesCache;
    }

    try {
      setLoading(true);
      const data = await fetchWithRetry();
      if (data.length > 0) {
        // Update both state and cache
        spacesCache = data;
        setSpaces(data);
      }
      return data;
    } catch (error) {
      let errorMessage = "Failed to fetch spaces. Please check your connection and try again.";
      if (axios.isAxiosError(error) && error.message.includes("timeout")) {
        errorMessage = "Request timed out. The server is taking too long to respond.";
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      console.error("Fetch spaces error:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Function to force refresh data (for manual reload)
  const refreshSpaces = async () => {
    // Clear cache
    spacesCache = [];
    // Fetch fresh data
    return fetchSpaces();
  };

  const createSpace = async (newSpace: NewSpaceData) => {
    try {
      await api.post("/spaces", newSpace);
      await refreshSpaces(); // Force refresh after creating
      toast({
        title: "Success",
        description: "Space created successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create space",
      });
      return false;
    }
  };

  const updateSpace = async (spaceId: string, spaceData: Partial<Space>) => {
    try {
      await api.put(`/spaces/${spaceId}`, spaceData);
      await refreshSpaces(); // Force refresh after updating
      toast({
        title: "Success",
        description: "Space updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update space",
      });
      return false;
    }
  };

  const deleteSpace = async (spaceId: string) => {
    try {
      setIsDeleting(true);
      await api.delete(`/spaces/${spaceId}`);
      await refreshSpaces(); // Force refresh after deleting
      toast({
        title: "Success",
        description: "Space deleted successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete space",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper functions to filter spaces by type
  const getBlocks = () => spaces.filter(space => space.spaceTypeName === "Block");
  const getFloors = (blockId: string) => {
    const block = spaces.find(space => space.spaceId === blockId);
    return block?.children || [];
  };
  const getRooms = (blockId: string, floorId: string) => {
    const block = spaces.find(space => space.spaceId === blockId);
    const floor = block?.children.find(space => space.spaceId === floorId);
    return floor?.children || [];
  };

  return {
    spaces,
    loading,
    isDeleting,
    fetchSpaces,
    refreshSpaces,
    createSpace,
    updateSpace,
    deleteSpace,
    getBlocks,
    getFloors,
    getRooms,
  };
};