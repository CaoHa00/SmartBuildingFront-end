import React from 'react';
import { Room, NewRoomData } from '@/types/block-management';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NewRoomData) => void;
  isEdit: boolean;
  initialData?: Room & { floorId: number };
  floorId?: number;
}

export function RoomDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isEdit, 
  initialData,
  floorId 
}: RoomDialogProps) {
  const [formData, setFormData] = React.useState<NewRoomData>({ 
    roomName: initialData?.roomName || "",
    floorId: initialData?.floorId || floorId || 0
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
            {isEdit ? "Edit Room" : "Add New Room"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="roomName" className="text-neutral-700">
              Room Name
            </Label>
            <Input
              id="roomName"
              value={formData.roomName}
              onChange={(e) =>
                setFormData({ ...formData, roomName: e.target.value })
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