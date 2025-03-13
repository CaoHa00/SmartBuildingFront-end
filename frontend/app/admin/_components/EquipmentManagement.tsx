"use client";

import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/axios";

interface Floor {
  floorId: number;
  floorName: string;
}

interface Equipment {
  equipmentId: number;
  equipmentName: string;
  equipmentType: string;
  roomId: number;
  floorId: number;
}

export function EquipmentManagement() {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [formData, setFormData] = useState({
    equipmentName: '',
    equipmentType: '',
    roomId: '',
  });

  useEffect(() => {
    fetchFloors();
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const { data } = await api.get('/equipment');
      setEquipment(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch equipment",
      });
    }
  };

  const fetchFloors = async () => {
    try {
      const { data } = await api.get('/floors');
      setFloors(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch floors",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/equipment', formData);
      await fetchEquipment();
      toast({
        title: "Success",
        description: "Equipment created successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit equipment. Please try again.",
      });
    }
  };

  const handleDelete = async (equipmentId: number) => {
    try {
      await api.delete(`/equipment/${equipmentId}`);
      await fetchEquipment();
      toast({
        title: "Success",
        description: "Equipment deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete equipment. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
          Equipment Management
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Equipment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                Add New Equipment
              </DialogTitle>
            </DialogHeader>
            <form className="space-y-4 text-xl text-neutral-700" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="equipmentName">Equipment Name</Label>
                <Input 
                  id="equipmentName" 
                  value={formData.equipmentName}
                  onChange={(e) => setFormData({...formData, equipmentName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="roomId">Room</Label>
                <Select onValueChange={(value) => setFormData({...formData, roomId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Room 101</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="equipmentType">Equipment Type</Label>
                <Select onValueChange={(value) => setFormData({...formData, equipmentType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ac">Air Conditioner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Submit</Button>
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
              <TableHead>Room</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((equipment) => (
              <TableRow key={equipment.equipmentId}>
                <TableCell>{equipment.equipmentId}</TableCell>
                <TableCell>{equipment.equipmentName}</TableCell>
                <TableCell>{equipment.equipmentType}</TableCell>
                <TableCell>
                  {floors.find(f => f.floorId === equipment.floorId)?.floorName || 'N/A'}
                </TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(equipment.equipmentId)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
