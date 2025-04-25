import { useState } from "react";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { SpaceType } from "@/types/space";

export const useSpaceTypes = () => {
  const { toast } = useToast();
  const [spaceTypes, setSpaceTypes] = useState<SpaceType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSpaceTypes = async () => {
    try {
      setLoading(true);
      const response = await api.get<SpaceType[]>("/space-types");
      if (response.data.length > 0) {
        const sortedData = response.data.sort((a, b) => a.spaceLevel - b.spaceLevel);
        setSpaceTypes(sortedData);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch space types",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    spaceTypes,
    loading,
    fetchSpaceTypes,
  };
};