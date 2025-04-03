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

interface Equipment {
  equipmentId: number;
  equipmentName: string;
  deviceId: string;
  equipmentType: {
    equipmentTypeId: string;
    equipmentTypeName: string;
  };
  category: {
    categoryId: number;
    categoryName: string;
  };
  room: {
    roomId: number;
    roomName: string;
  };
  logValues: any[];
}

interface EquipmentFormData {
  equipmentId?: number;
  equipmentName: string;
  deviceId: string;
  equipmentTypeId: string;
  categoryId: number;
  roomId: number;
}

interface Room {
  roomId: number;
  roomName: string;
  floorId: number;
}

interface EquipmentType {
  equipmentTypeId: string;
  equipmentTypeName: string;
}

interface Category {
  categoryId: number;
  categoryName: string;
}

export function EquipmentManagement() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<EquipmentFormData>({
    equipmentName: "",
    deviceId: "",
    equipmentTypeId: "",
    categoryId: 0,
    roomId: 0,
  });

  useEffect(() => {
    fetchEquipment();
    fetchRooms();
    fetchEquipmentTypes();
    fetchCategories();
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

  const fetchEquipmentTypes = async () => {
    try {
      const { data } = await api.get("/equipmentType");
      setEquipmentTypes(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch equipment types",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/category");
      setCategories(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch categories",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.roomId || !formData.categoryId || !formData.equipmentTypeId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      });
      return;
    }

    try {
      const payload = {
        equipmentName: formData.equipmentName,
        deviceId: formData.deviceId,
      };

      if (isEdit && formData.equipmentId) {
        await api.put(`/equipment/${formData.equipmentId}`, payload);
      } else {
        await api.post(`/equipment`, payload, {
          params: {
            roomId: formData.roomId,
            equipmentTypeId: formData.equipmentTypeId,
            categoryId: formData.categoryId,
          },
        });
      }
      fetchEquipment();
      setIsOpen(false);
      setFormData({
        equipmentName: "",
        deviceId: "",
        equipmentTypeId: "",
        categoryId: 0,
        roomId: 0,
      });
      setIsEdit(false);
      toast({
        title: "Success",
        description: isEdit
          ? "Equipment updated successfully"
          : "Equipment created successfully",
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
      deviceId: equipment.deviceId,
      equipmentTypeId: equipment.equipmentType.equipmentTypeId,
      categoryId: equipment.category.categoryId,
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
                setFormData({
                  equipmentName: "",
                  deviceId: "",
                  equipmentTypeId: "",
                  categoryId: 0,
                  roomId: 0,
                });
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
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-xl text-neutral-700"
            >
              <div>
                <Label htmlFor="equipmentName">Equipment Name</Label>
                <Input
                  id="equipmentName"
                  value={formData.equipmentName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      equipmentName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="deviceId">Device ID</Label>
                <Input
                  id="deviceId"
                  value={formData.deviceId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deviceId: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="roomId">Room</Label>
                <Select
                  value={String(formData.roomId)}
                  onValueChange={(value) =>
                    setFormData({ ...formData, roomId: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem
                        key={`room-${room.roomId}`}
                        value={String(room.roomId)}
                      >
                        {room.roomName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="equipmentType">Equipment Type</Label>
                <Select
                  value={formData.equipmentTypeId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, equipmentTypeId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentTypes.map((type) => (
                      <SelectItem
                        key={`type-${type.equipmentTypeId}`}
                        value={type.equipmentTypeId}
                      >
                        {type.equipmentTypeName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={String(formData.categoryId)}
                  onValueChange={(value) =>
                    setFormData({ ...formData, categoryId: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={`category-${category.categoryId}`}
                        value={String(category.categoryId)}
                      >
                        {category.categoryName}
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
              <TableHead>Name</TableHead>
              <TableHead>Device ID</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.equipmentId}>
                <TableCell>{item.equipmentName}</TableCell>
                <TableCell>{item.deviceId}</TableCell>
                <TableCell>{item.room.roomName}</TableCell>
                <TableCell>{item.equipmentType.equipmentTypeName}</TableCell>
                <TableCell>{item.category.categoryName}</TableCell>
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