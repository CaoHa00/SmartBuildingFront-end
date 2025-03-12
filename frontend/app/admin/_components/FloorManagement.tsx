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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const api = axios.create({
  baseURL: "http://localhost:9090/api", //will import back to .env file ...
  headers: {
    "Content-Type": "application/json",
  },
});

interface Floor {
  floor_id: number;
  floorName: string;
  block_id: number;
  rooms: any[];
}

interface Block {
  block_id: number;
  blockName: string;
  floors: any[];
}


export function FloorManagement() {
  const [floors, setFloors] = useState([
    { id: 1, name: "1st Floor", blockId: 1, level: 1 },
    { id: 2, name: "2nd Floor", blockId: 1, level: 2 },
  ]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
          Floor Management
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Floor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                Add New Floor
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 text-xl text-neutral-700">
              <div>
                <Label htmlFor="name">Floor Name</Label>
                <Input id="name" />
              </div>
              <div>
                <Label htmlFor="block">Block</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select block" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Block A</SelectItem>
                    <SelectItem value="2">Block B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Input id="level" type="number" />
              </div>
              <Button type="submit">Save</Button>
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
              <TableHead>Level</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {floors.map((floor) => (
              <TableRow key={floor.id}>
                <TableCell>{floor.id}</TableCell>
                <TableCell>{floor.name}</TableCell>
                <TableCell>Block A</TableCell>
                <TableCell>{floor.level}</TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2">
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
