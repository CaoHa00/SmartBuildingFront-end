import React from 'react';
import { Floor, NewFloorData } from '@/types/block-management';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Floor Information</DialogTitle>
          <DialogDescription className="text-gray-300">
            View and manage floor details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              defaultValue={formData.floorName}
              className="col-span-3 text-white"
              readOnly={!isEdit}
              onChange={(e) => setFormData({ ...formData, floorName: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rooms" className="text-white">Total Rooms</Label>
            <Input
              id="rooms"
              defaultValue={initialData?.totalRooms?.toString() || "N/A"}
              className="col-span-3 text-white"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="occupancy" className="text-white">Occupancy</Label>
            <Input
              id="occupancy"
              defaultValue={initialData?.occupancy ? `${initialData.occupancy}%` : 'N/A'}
              className="col-span-3 text-white"
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="text-white hover:text-blue-200"
          >
            Cancel
          </Button>
          {isEdit && (
            <Button 
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}