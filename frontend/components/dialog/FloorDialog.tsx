import React from 'react';
import { Floor, NewFloorData } from '@/types/block-management';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FloorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NewFloorData) => void;
  isEdit: boolean;
  initialData?: Floor & { blockId: number };
  blockId?: number;
}

export function FloorDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isEdit, 
  initialData,
  blockId 
}: FloorDialogProps) {
  const [formData, setFormData] = React.useState<NewFloorData>({ 
    floorName: initialData?.floorName || "",
    blockId: initialData?.blockId || blockId || 0
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
            {isEdit ? "Edit Floor" : "Add New Floor"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 text-neutral-700">
          <div>
            <Label htmlFor="floorName">
              Floor Name
            </Label>
            <Input
              id="floorName"
              value={formData.floorName}
              onChange={(e) =>
                setFormData({ ...formData, floorName: e.target.value })
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