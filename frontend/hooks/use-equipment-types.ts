import { useState } from "react";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { EquipmentType } from "@/types/equipment";

export const useEquipmentTypes = () => {
  const { toast } = useToast();
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEquipmentTypes = async () => {
    try {
      setLoading(true);
      const response = await api.get<EquipmentType[]>("/equipmentType");
      setEquipmentTypes(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch equipment types",
      });
    } finally {
      setLoading(false);
    }
  };

  const createEquipmentType = async (equipmentTypeName: string) => {
    try {
      await api.post("/equipmentType", { equipmentTypeName });
      await fetchEquipmentTypes();
      toast({
        title: "Success",
        description: "Equipment type added successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add equipment type",
      });
      return false;
    }
  };

  const updateEquipmentType = async (equipmentTypeId: string, equipmentTypeName: string) => {
    try {
      await api.put(`/equipmentType/${equipmentTypeId}`, { equipmentTypeName });
      await fetchEquipmentTypes();
      toast({
        title: "Success",
        description: "Equipment type updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update equipment type",
      });
      return false;
    }
  };

  const deleteEquipmentType = async (equipmentTypeId: string) => {
    try {
      setIsDeleting(true);
      await api.delete(`/equipmentType/${equipmentTypeId}`);
      await fetchEquipmentTypes();
      toast({
        title: "Success",
        description: "Equipment type deleted successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete equipment type",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    equipmentTypes,
    loading,
    isDeleting,
    fetchEquipmentTypes,
    createEquipmentType,
    updateEquipmentType,
    deleteEquipmentType,
  };
};