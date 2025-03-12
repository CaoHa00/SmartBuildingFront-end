"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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

const api = axios.create({
  baseURL: "http://localhost:9090",
  headers: {
    "Content-Type": "application/json",
  },
});

interface Floor {
  floor_id: number;
  floorName: string;
  block_id: number;
  // rooms: any[];
}

interface Block {
  block_id: number;
  blockName: string;
  // floors: any[];
}

export function FloorManagement() {
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
      const { data } = await api.get("/floor");
      setFloors(data);
    } catch (e) {
      console.error("Failed to fetch floors:", e);
    }
  };

  const fetchBlocks = async () => {
    try {
      const { data } = await api.get("/block");
      setBlocks(data);
    } catch (error) {
      console.error("Failed to fetch blocks:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/floor/${formData.floor_id}`, formData);
      } else {
        await api.post("/floor", formData);
      }
      fetchFloors();
      setIsOpen(false);
      setFormData({
        floor_id: 0,
        floorName: "",
        block_id: 0,
        // rooms: [],
      });
      setIsEdit(false);
    } catch (e) {
      console.error("Failed to save floor:", e);
    }
  };

  const handleEdit = (floor: Floor) => {
    setFormData(floor);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = async (floorId: number) => {
    try {
      await api.delete(`/floor/${floorId}`);
      fetchFloors();
    } catch (e) {
      console.error("Failed to delete floor:", e);
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
                  onValueChange={(value) =>
                    setFormData({ ...formData, block_id: parseInt(value, 10) })
                  }
                  value={formData.block_id ? String(formData.block_id) : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select block" />
                  </SelectTrigger>
                  <SelectContent>
                    {blocks.map((block) => (
                      <SelectItem
                        key={block.block_id}
                        value={String(block.block_id)}
                      >
                        {block.blockName}
                      </SelectItem>
                    ))}
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
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {floors.map((floor) => (
              <TableRow
                key={floor.floor_id}
                className="hover:bg-[hsl(var(--tech-blue))/5]"
              >
                <TableCell>{floor.floor_id}</TableCell>
                <TableCell>{floor.floorName}</TableCell>
                <TableCell>
                  {blocks.find((block) => block.block_id === floor.block_id)
                    ?.blockName || "Unknown"}
                </TableCell>
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
                    onClick={() => handleDelete(floor.floor_id)}
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
