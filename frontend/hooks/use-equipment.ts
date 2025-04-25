import { useState } from "react";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { Equipment, NewEquipmentData } from "@/types/equipment";

export const useEquipment = (spaceId?: string) => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const createEquipment = async (newEquipment: NewEquipmentData) => {
    try {
      const response = await api.post("/equipment", newEquipment);
      const createdEquipment = response.data;
      setEquipment(prev => [...prev, createdEquipment]);
      toast({
        title: "Success",
        description: "Equipment created successfully",
      });
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

  const updateEquipment = async (equipmentId: number, equipmentData: Partial<Equipment>) => {
    try {
      const response = await api.put(`/equipment/${equipmentId}`, equipmentData);
      const updatedEquipment = response.data;
      setEquipment(prev => 
        prev.map(eq => eq.equipmentId === updatedEquipment.equipmentId ? updatedEquipment : eq)
      );
      toast({
        title: "Success",
        description: "Equipment updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update equipment",
      });
      return false;
    }
  };

  const deleteEquipment = async (equipmentId: number) => {
    try {
      setIsDeleting(true);
      await api.delete(`/equipment/${equipmentId}`);
      setEquipment(prev => prev.filter(eq => eq.equipmentId !== equipmentId));
      toast({
        title: "Success",
        description: "Equipment deleted successfully",
      });
      return true;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete equipment",
      });
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    equipment,
    loading,
    isDeleting,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    setEquipment
  };
};