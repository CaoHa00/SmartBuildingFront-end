"use client";

import { useState } from "react";
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

export function BlockManagement() {
  const [blocks, setBlocks] = useState([
    { id: 1, name: "Block A", description: "Main Building" },
    { id: 2, name: "Block B", description: "Secondary Building" },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
          Block Management
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]">
              Add New Block
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                Add New Block
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 text-xl text-neutral-700">
              <div>
                <Label htmlFor="name">Block Name</Label>
                <Input id="name" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" />
              </div>
              <Button type="submit">Save</Button>
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
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.map((block) => (
              <TableRow
                key={block.id}
                className="hover:bg-[hsl(var(--tech-blue))/5]"
              >
                <TableCell>{block.id}</TableCell>
                <TableCell>{block.name}</TableCell>
                <TableCell>{block.description}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                  >
                    Edit
                  </Button>
                  <Button variant="destructive">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
