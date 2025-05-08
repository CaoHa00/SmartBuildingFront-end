import { useState, useCallback, useRef } from "react";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Space, NewSpaceData } from "@/types/space";
import axios, { AxiosError } from "axios";

let spacesCache: { data: Space[]; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;
const DEBOUNCE_DELAY = 300;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const useSpaces = () => {
  const { toast } = useToast();
  const [spaces, setSpaces] = useState<Space[]>(spacesCache?.data || []);
  // const [loading, setLoading] = useState(!spacesCache?.data);
  const [isDeleting, setIsDeleting] = useState(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const isCacheValid = useCallback(() => {
    return (
      spacesCache !== null &&
      spacesCache.timestamp > Date.now() - CACHE_TTL &&
      spacesCache.data.length > 0
    );
  }, []);

  const fetchWithRetry = async (retryCount = 0): Promise<Space[]> => {
    try {
      const response = await api.get<Space[]>("/spaces/all");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (
          (axiosError.code === "ECONNABORTED" ||
            axiosError.message.includes("timeout")) &&
          retryCount < MAX_RETRIES
        ) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          return fetchWithRetry(retryCount + 1);
        }
      }
      throw error;
    }
  };

  const fetchSpaces = useCallback(async () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (isCacheValid()) {
      setSpaces(spacesCache!.data);
      // setLoading(false);
      return spacesCache!.data;
    }

    try {
      // setLoading(true);
      const data = await fetchWithRetry();
      if (data.length > 0) {
        spacesCache = { data, timestamp: Date.now() };
        setSpaces(data);
      }
      return data;
    } catch (error) {
      let errorMessage =
        "Failed to fetch spaces. Please check your connection and try again.";
      if (axios.isAxiosError(error) && error.message.includes("timeout")) {
        errorMessage =
          "Request timed out. The server is taking too long to respond.";
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      console.error("Fetch spaces error:", error);
      return [];
    } finally {
      // setLoading(false);
    }
  }, [toast, isCacheValid]);

  const refreshSpaces = useCallback(() => {
    spacesCache = null;
    return new Promise((resolve) => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(() => {
        resolve(fetchSpaces());
      }, DEBOUNCE_DELAY);
    });
  }, [fetchSpaces]);

  const createSpace = async (newSpace: NewSpaceData): Promise<boolean> => {
    try {
      const response = await api.post("/spaces", newSpace);
      const createdSpace = response.data.data;

      insertNestedSpace(createdSpace);

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

  const updateSpace = async (
    spaceId: string,
    spaceData: Partial<Space>
  ): Promise<boolean> => {
    try {
      const response = await api.put(`/spaces/${spaceId}`, spaceData);
      const updatedSpace = response.data.data;

      updateNestedSpace(updatedSpace);

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
      if (spacesCache) {
        const newData = deleteNestedSpaceFromList(spacesCache.data, spaceId);
        spacesCache.data = newData;
        spacesCache.timestamp = Date.now();
        setSpaces(newData);
      }
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

  const getBlocks = () =>
    spaces.filter((space) => space.spaceTypeName === "Block");
  const getFloors = (blockId: string) => {
    const block = spaces.find((space) => space.spaceId === blockId);
    return block?.children || [];
  };
  const getRooms = (blockId: string, floorId: string) => {
    const block = spaces.find((space) => space.spaceId === blockId);
    const floor = block?.children.find((space) => space.spaceId === floorId);
    return floor?.children || [];
  };

  const updateNestedSpace = (updatedSpace: Space) => {
    const updateChildren = (children: Space[]): Space[] => {
      return children.map((child) => {
        if (child.spaceId === updatedSpace.spaceId) {
          return updatedSpace;
        }
        if (child.children && child.children.length > 0) {
          return { ...child, children: updateChildren(child.children) };
        }
        return child;
      });
    };

    if (spacesCache) {
      spacesCache.data = spacesCache.data.map((space) => {
        if (space.spaceId === updatedSpace.spaceId) {
          return updatedSpace;
        }
        if (space.children && space.children.length > 0) {
          return { ...space, children: updateChildren(space.children) };
        }
        return space;
      });
      spacesCache.timestamp = Date.now();
      setSpaces(spacesCache.data);
    }
  };

  const insertNestedSpace = (newSpace: Space) => {
    const insertIntoChildren = (spaces: Space[]): Space[] => {
      return spaces.map((space) => {
        if (space.spaceId === newSpace.parentId) {
          const updatedChildren = [...(space.children || []), newSpace];
          return { ...space, children: updatedChildren };
        }
        if (space.children && space.children.length > 0) {
          return { ...space, children: insertIntoChildren(space.children) };
        }
        return space;
      });
    };

    if (spacesCache) {
      if (newSpace.parentId) {
        spacesCache.data = insertIntoChildren(spacesCache.data);
      } else {
        spacesCache.data = [...spacesCache.data, newSpace];
      }
      spacesCache.timestamp = Date.now();
      setSpaces(spacesCache.data);
    }
  };

  const deleteNestedSpaceFromList = (
    spaces: Space[],
    targetId: string
  ): Space[] => {
    return spaces
      .filter((space) => space.spaceId !== targetId)
      .map((space) => ({
        ...space,
        children: space.children
          ? deleteNestedSpaceFromList(space.children, targetId)
          : [],
      }));
  };

  return {
    spaces,
    // loading,
    isDeleting,
    fetchSpaces,
    refreshSpaces,
    createSpace,
    updateSpace,
    deleteSpace,
    getBlocks,
    getFloors,
    getRooms,
    updateNestedSpace,
  };
};
