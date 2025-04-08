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
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

interface Equipment {
  equipmentId: number;
  equipmentName: string;
  deviceId: string;
  equipmentType?: string;
  equipmentStatus?: string;
}

interface Room {
  roomId: number;
  roomName: string;
  floor: Floor;
  equipment: Equipment[];
}

interface NewRoomData {
  roomName: string;
}

interface Floor {
  floorId: number;
  floorName: string;
  block: Block;
  rooms: any[];
}

interface Block {
  blockId: number;
  blockName: string;
  floors: any[];
}

export function RoomManagement() {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<Partial<Room>>({
    roomName: "",
  });
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false);
  const [roomEquipment, setRoomEquipment] = useState<Equipment[]>([]);

  useEffect(() => {
    fetchRooms();
    fetchFloors();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get<Room[]>("/room");
      if (response.data.length > 0) {
        setRooms(response.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch rooms",
      });
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Before submitting, FormData:", formData);
    try {
      if (!formData.floor) {
        alert("Please select a floor before submitting.");
        return;
      }
      if (isEdit) {
        await api.put(`/room/${formData.roomId}`, formData);
      } else {
        const newRoom: NewRoomData = {
          roomName: formData.roomName || "",
        };
        await api.post(`/room/${formData.floor.floorId}`, newRoom);
      }
      fetchRooms();
      console.log("Submitting FormData:", formData);
      setIsOpen(false);
      setFormData((prevData) => ({
        roomId: 0,
        roomName: "",
        floor: prevData.floor || {
          floorId: 0,
          floorName: "",
          block: { blockId: 0, blockName: "", floors: [] },
          rooms: [],
        },
        equipment: [],
      }));
      setIsEdit(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save room",
      });
    }
  };

  const handleEdit = (room: Room) => {
    setFormData(room);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSelectFloor = async (value: string) => {
    let floorId = parseInt(value, 10);
    try {
      const response = await api.get<Floor>(`/floor/${floorId}`);
      if (response.data) {
        setFormData({ ...formData, floor: response.data });
      } else {
        console.error("No floor data found for ID:", floorId);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch floor by ID",
      });
    }
  };

  const handleDelete = async (roomId: number) => {
    try {
      await api.delete(`/room/${roomId}`);
      fetchRooms();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete room",
      });
    }
  };

  const fetchEquipmentByRoomId = async (roomId: number) => {
    try {
      const response = await api.get<Equipment[]>(`/room/${roomId}/equipment`);
      setRoomEquipment(response.data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch equipment",
      });
    }
  };

  const handleViewEquipment = async (room: Room) => {
    setSelectedRoom(room);
    setIsEquipmentDialogOpen(true);
    await fetchEquipmentByRoomId(room.roomId);
  };

  console.log("Rooms data:", rooms);
  console.log("Floors data:", floors);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
          Room Management
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
              onClick={() => {
                setIsEdit(false);
                setFormData({ roomName: "" });
              }}
            >
              Add New Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                {isEdit ? "Edit Room" : "Add New Room"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-xl text-neutral-700 "
            >
              <div>
                <Label htmlFor="name">Room Name</Label>
                <Input
                  id="floorName"
                  value={formData.roomName}
                  onChange={(e) =>
                    setFormData({ ...formData, roomName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="floor">Floor</Label>
                <Select
                  onValueChange={(value) => handleSelectFloor(value)}
                  value={
                    formData.floor?.floorId
                      ? String(formData.floor.floorId)
                      : undefined
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {floors.map((floor) => (
                      <SelectItem
                        key={floor.floorId}
                        value={String(floor.floorId)}
                      >
                        {floor.floorName}
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

      <Dialog open={isEquipmentDialogOpen} onOpenChange={setIsEquipmentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
              Equipment in {selectedRoom?.roomName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {roomEquipment.length === 0 ? (
              <p className="text-neutral-700">No equipment in this room</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Device ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roomEquipment.map((eq) => (
                    <TableRow key={eq.equipmentId}>
                      <TableCell>{eq.equipmentName}</TableCell>
                      <TableCell>{eq.equipmentType}</TableCell>
                      <TableCell>{eq.equipmentStatus || 'N/A'}</TableCell>
                      <TableCell>{eq.deviceId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border border-border text-neutral-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Equipment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.roomId}>
                <TableCell>{room.roomName}</TableCell>
                <TableCell>{room.floor.floorName}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {room.equipment && room.equipment.length > 0 ? (
                      room.equipment.map((eq) => (
                        <div 
                          key={eq.equipmentId} 
                          className="flex items-center gap-2 p-1 rounded-md bg-slate-50"
                        >
                          <span className="font-medium">{eq.equipmentName}</span>
                          <span className="text-sm text-muted-foreground">({eq.equipmentType})</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            eq.equipmentStatus === 'Active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {eq.equipmentStatus || 'N/A'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No equipment</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline"
                    className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                    onClick={() => handleViewEquipment(room)}
                  >
                    View Equipment
                  </Button>
                  <Button
                    variant="outline"
                    className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                    onClick={() => handleEdit(room)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(room.roomId)}
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
