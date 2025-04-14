import React from 'react';
import { Equipment, NewEquipmentData } from '@/types/block-management';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    equipmentName: initialData?.equipmentName || "",
    deviceId: initialData?.deviceId || "",
    roomId: initialData?.roomId || roomId || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}