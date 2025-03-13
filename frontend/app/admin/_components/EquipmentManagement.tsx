"use client";

import { useEffect, useState } from "react";
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

interface LogUHoo {
  id: number;
  // Add other properties as needed
}

interface LogAqara {
  id: number;
  // Add other properties as needed
}

interface Equipment {
  equipmentId: number;
  equipmentName: string;
  equipmentType: string;
  room: {
    roomId: number;
    roomName: string;
  };
  logUHoos: LogUHoo[];
  logAqaras: LogAqara[];
}

interface EquipmentFormData {
  equipmentId?: number;
  equipmentName: string;
  equipmentType: string;
  roomId: number;
}

interface Room {
  roomId: number;
  roomName: string;
  floorId: number;
}

export function EquipmentManagement() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<EquipmentFormData>({
    equipmentName: "",
    equipmentType: "",
    roomId: 0,
  });

  useEffect(() => {
    fetchEquipment();
    fetchRooms();
  }, []);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/equipment");
      setEquipment(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch equipment",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const { data } = await api.get("/room");
      setRooms(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch rooms",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.roomId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a room",
      });
      return;
    }

    try {
      const payload = {
        equipmentName: formData.equipmentName,
        equipmentType: formData.equipmentType
      };

      if (isEdit && formData.equipmentId) {
        await api.put(`/equipment/${formData.equipmentId}`, payload);
      } else {
        await api.post(`/equipment/${formData.roomId}`, payload);
      }
      fetchEquipment();
      setIsOpen(false);
      setFormData({
        equipmentName: "",
        equipmentType: "",
        roomId: 0,
      });
      setIsEdit(false);
      toast({
        title: "Success",
        description: isEdit ? "Equipment updated successfully" : "Equipment created successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save equipment. Please try again.",
      });
    }
  };

  const handleEdit = (equipment: Equipment) => {
    setFormData({
      equipmentId: equipment.equipmentId,
      equipmentName: equipment.equipmentName,
      equipmentType: equipment.equipmentType,
      roomId: equipment.room.roomId,
    });
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = async (equipmentId: number) => {
    try {
      await api.delete(`/equipment/${equipmentId}`);
      fetchEquipment();
      toast({
        title: "Success",
        description: "Equipment deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete equipment",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
          Equipment Management
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
              onClick={() => {
                setIsEdit(false);
                setFormData({ equipmentName: "", equipmentType: "", roomId: 0 });
              }}
            >
              Add New Equipment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                {isEdit ? "Edit Equipment" : "Add New Equipment"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 text-xl text-neutral-700">
              <div>
                <Label htmlFor="equipmentName">Equipment Name</Label>
                <Input
                  id="equipmentName"
                  value={formData.equipmentName}
                  onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="roomId">Room</Label>
                <Select 
                  value={String(formData.roomId)} 
                  onValueChange={(value) => setFormData({ ...formData, roomId: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.roomId} value={String(room.roomId)}>
                        {room.roomName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="equipmentType">Equipment Type</Label>
                <Select 
                  value={formData.equipmentType} 
                  onValueChange={(value) => setFormData({ ...formData, equipmentType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC">Air Conditioner</SelectItem>
                    <SelectItem value="LIGHT">Light</SelectItem>
                    <SelectItem value="UHOO">UHoo Sensor</SelectItem>
                    <SelectItem value="AQARA">Aqara Sensor</SelectItem>
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
              <TableHead>Room</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.equipmentId}>
                <TableCell>{item.equipmentName}</TableCell>
                <TableCell>{item.room.roomName}</TableCell>
                <TableCell>{item.equipmentType}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item.equipmentId)}
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
