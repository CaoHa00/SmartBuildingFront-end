"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Floor {
  floorId: number;
  floorName: string;
  block: Block;
  rooms: any[];
}

interface NewFloorData {
  floorName: string;
}

interface Block {
  blockId: number;
  blockName: string;
  floors: any[];
}

export function FloorManagement() {
  const { toast } = useToast();
  const [floors, setFloors] = useState<Floor[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<Partial<Floor>>({
    floorName: "",
  });

  useEffect(() => {
    fetchFloors();
    fetchBlocks();
  }, []);

  const fetchFloors = async () => {
    try {
      const response = await api.get<Floor[]>("/floor");
      if (response.data.length > 0) {
        setFloors(response.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch floors",
      });
    }
  };

  const fetchBlocks = async () => {
    try {
      const response = await api.get<Block[]>("/block");
      if (response.data.length > 0) {
        setBlocks(response.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch blocks",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Before submitting, FormData:", formData);
    try {
      if (!formData.block) {
        alert("Please select a block before submitting.");
        return;
      }
      if (isEdit) {
        await api.put(`/floor/${formData.floorId}`, formData);
      } else {
        const newFloor: NewFloorData = {
          floorName: formData.floorName || "",
        };
        await api.post(`/floor/${formData.block.blockId}`, newFloor);
      }
      fetchFloors();
      console.log("Submitting FormData:", formData);
      setIsOpen(false);
      setFormData((prevData) => ({
        floorId: 0,
        floorName: "",
        block: prevData.block || { blockId: 0, blockName: "", floors: [] }, // Preserve selected block if needed
        rooms: [],
      }));
      setIsEdit(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save floor",
      });
    }
  };

  const handleEdit = (floor: Floor) => {
    setFormData(floor);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSelectBlock = async (value: string) => {
    console.log("Selected Value:", value);
    let blockId = parseInt(value, 10);
    try {
      const response = await api.get<Block>(`/block/${blockId}`);
      if (response.data) {
        setFormData({ ...formData, block: response.data });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No block data found for the selected ID",
        });
      }
    } catch (error) {
      console.error("API error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch block by ID",
      });
    }
  };

  const handleDelete = async (floorId: number) => {
    try {
      await api.delete(`/floor/${floorId}`);
      fetchFloors();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete floor",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
          Floor Management
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
              onClick={() => {
                setIsEdit(false);
                setFormData({ floorName: "" });
              }}
            >
              Add New Floor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                {isEdit ? "Edit Floor" : "Add New Floor"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-xl text-neutral-700"
            >
              <div>
                <Label htmlFor="floorName">Floor Name</Label>
                <Input
                  id="floorName"
                  value={formData.floorName}
                  onChange={(e) =>
                    setFormData({ ...formData, floorName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="block_id">Block</Label>
                <Select
                  onValueChange={(value) => handleSelectBlock(value)}
                  value={
                    formData.block?.blockId
                      ? String(formData.block.blockId)
                      : undefined
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select block" />
                  </SelectTrigger>
                  <SelectContent>
                    {blocks.length > 0 ? (
                      blocks.map((block) => (
                        <SelectItem
                          key={block.blockId}
                          value={String(block.blockId)}
                        >
                          {block.blockName}
                        </SelectItem>
                      ))
                    ) : (
                      <div>No blocks available</div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-border text-neutral-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {floors.map((floor) => (
              <TableRow
                key={floor.floorId}
                className="hover:bg-[hsl(var(--tech-blue))/5]"
              >
                <TableCell>{floor.floorName}</TableCell>
                <TableCell>{floor.block.blockName}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                    onClick={() => handleEdit(floor)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(floor.floorId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
