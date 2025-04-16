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

  // Update form data when initialData or floorId changes
  React.useEffect(() => {
    setFormData({
      roomName: initialData?.roomName || "",
      floorId: initialData?.floorId || floorId || 0
    });
  }, [initialData, floorId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.roomName.trim()) {
      return; // Don't submit if room name is empty
    }
    if (!formData.floorId) {
      return; // Don't submit if floorId is not set
    }
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
        <form onSubmit={handleSubmit} className="space-y-4 text-neutral-700">
          <div>
            <Label htmlFor="roomName">Room Name</Label>
            <Input
              id="roomName"
              value={formData.roomName}
              onChange={(e) =>
                setFormData({ ...formData, roomName: e.target.value.trim() })
              }
              required
              placeholder="Enter room name"
            />
          </div>
          <Button 
            type="submit"
            disabled={!formData.roomName.trim() || !formData.floorId}
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}