"use client";

import { useState, useEffect } from "react";
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

const api = axios.create({
  baseURL: "http://localhost:9090/api", //will import back to .env file
  headers: {
    "Content-Type": "application/json",
  },
});

interface Block {
  block_id: number;
  blockName: string;
  floors: any[];
}

export function BlockManagement() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<Partial<Block>>({
    blockName: "",
  });

  useEffect(() => {
    fetchBlocks();
  }, []);

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
        await api.put(`/block/${formData.block_id}`, formData);
      } else {
        await api.post("/block", formData);
      }
      fetchBlocks();
      setIsOpen(false);
      setFormData({ blockName: "" });
      setIsEdit(false);
    } catch (error) {
      console.error("Failed to save block:", error);
    }
  };

  const handleDelete = async (blockId: number) => {
    try {
      await api.delete(`/block/${blockId}`);
      fetchBlocks();
    } catch (error) {
      console.error("Failed to delete block:", error);
    }
  };

  const handleEdit = (block: Block) => {
    setFormData(block);
    setIsEdit(true);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
          Block Management
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
              onClick={() => {
                setIsEdit(false);
                setFormData({ blockName: "" });
              }}
            >
              Add New Block
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                {isEdit ? "Edit Block" : "Add New Block"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-xl text-neutral-700"
            >
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
      </div>

      <div className="rounded-md border border-border text-neutral-700">
        <Table>
          <TableHeader>
            <TableRow className="bg-[hsl(var(--tech-blue))/5]">
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Floors</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.map((block) => (
              <TableRow
                key={block.block_id}
                className="hover:bg-[hsl(var(--tech-blue))/5]"
              >
                <TableCell>{block.block_id}</TableCell>
                <TableCell>{block.blockName}</TableCell>
                {/* <TableCell>{block.floors.length}</TableCell> */}
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                    onClick={() => handleEdit(block)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(block.block_id)}
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
