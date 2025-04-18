import React from 'react';
import { Equipment, NewEquipmentData } from '@/types/block-management';
import { Category } from '@/types/category';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/axios";

interface EquipmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NewEquipmentData) => void;
  isEdit: boolean;
  initialData?: Equipment & { roomId: number };
  roomId?: number;
}

export function EquipmentDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isEdit, 
  initialData,
  roomId 
}: EquipmentDialogProps) {
  const [formData, setFormData] = React.useState<NewEquipmentData>({ 
    equipmentName: "",
    deviceId: "",
    roomId: 0,
    categoryId: 0
  });
  const [categories, setCategories] = React.useState<Category[]>([]);

  // Reset form data when dialog opens or initialData changes
  React.useEffect(() => {
    if (open) {
      setFormData({ 
        equipmentName: initialData?.equipmentName || "",
        deviceId: initialData?.deviceId || "",
        roomId: initialData?.roomId || roomId || 0,
        categoryId: initialData?.categoryId || 0 // Ensure categoryId is set from initial data
      });

      // Fetch categories when dialog opens
      fetchCategories();
    }
  }, [open, initialData, roomId]);

  const fetchCategories = async () => {
    try {
      const response = await api.get<Category[]>('/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      alert('Please select a category');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-neutral-700">
            {isEdit ? "Edit Equipment" : "Add New Equipment"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 text-xl text-neutral-700">
          <div>
            <Label htmlFor="equipmentName" className="text-neutral-700">
              Equipment Name
            </Label>
            <Input
              id="equipmentName"
              value={formData.equipmentName}
              onChange={(e) =>
                setFormData({ ...formData, equipmentName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="deviceId" className="text-neutral-700">
              Device ID
            </Label>
            <Input
              id="deviceId"
              value={formData.deviceId}
              onChange={(e) =>
                setFormData({ ...formData, deviceId: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-neutral-700">
              Category
            </Label>
            <Select
              value={formData.categoryId ? formData.categoryId.toString() : ""}
              onValueChange={(value) =>
                setFormData({ ...formData, categoryId: parseInt(value, 10) })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem 
                    key={category.categoryId} 
                    value={category.categoryId.toString()}
                  >
                    {category.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}