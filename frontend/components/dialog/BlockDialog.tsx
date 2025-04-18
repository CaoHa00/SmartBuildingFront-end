import React from 'react';
import { Block, NewBlockData } from '@/types/block-management';
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
import { Badge } from "@/components/ui/badge";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Block Information</DialogTitle>
          <DialogDescription className="text-gray-300">
            View and manage block details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              defaultValue={initialData?.blockName}
              className="col-span-3 text-white"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-white">Status</Label>
            <div className="col-span-3">
              <Badge variant={initialData?.status === 'Active' ? 'default' : 'destructive'}>
                {initialData?.status}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="floors" className="text-white">Total Floors</Label>
            <Input
              id="floors"
              defaultValue={initialData?.totalFloors}
              className="col-span-3 text-white"
              readOnly
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" className="text-white hover:text-blue-200">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}