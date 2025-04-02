"use client";

import { useState, useEffect } from "react";
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
import { Spinner } from "@/components/ui/spinner";

interface Block {
  blockId: number;
  blockName: string;
  floors: any[];
}

interface NewBlockData {
  blockName: string;
}

export function BlockManagement() {
  const { toast } = useToast();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Block>>({
    blockName: "",
  });

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/block/${formData.blockId}`, formData);
      } else {
        const newBlock: NewBlockData = {
          blockName: formData.blockName || "",
        };
        await api.post("/block", newBlock);
      }
      fetchBlocks();
      setIsOpen(false);
      setFormData({ blockName: "" });
      setIsEdit(false);
      toast({
        title: "Success",
        description: `Block ${isEdit ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "create"} block`,
      });
    }
  };

  const handleDelete = async (blockId: number) => {
    try {
      await api.delete(`/block/${blockId}`);
      fetchBlocks();
      toast({
        title: "Success",
        description: "Block deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete block",
      });
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
              <TableHead>Name</TableHead>
              {/* <TableHead>Floors</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8">
                  <Spinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : (
              blocks.map((block) => (
                <TableRow
                  key={block.blockId}
                  className="hover:bg-[hsl(var(--tech-blue))/5]"
                >
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
                      onClick={() => handleDelete(block.blockId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
