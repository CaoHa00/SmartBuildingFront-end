import React from 'react';
import { Block, NewBlockData } from '@/types/block-management';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface BlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: NewBlockData) => void;
  isEdit: boolean;
  initialData?: Block;
}

export function BlockDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isEdit, 
  initialData 
}: BlockDialogProps) {
  const [formData, setFormData] = React.useState<NewBlockData>({ 
    blockName: initialData?.blockName || "" 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
            {isEdit ? "Edit Block" : "Add New Block"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 text-xl text-neutral-700">
          <div>
            <Label htmlFor="blockName">Block Name</Label>
            <Input
              id="blockName"
              value={formData.blockName}
              onChange={(e) =>
                setFormData({ ...formData, blockName: e.target.value })
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