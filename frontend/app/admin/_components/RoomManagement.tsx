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
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090",
  headers: {
    "Content-Type": "application/json",
  },
});

interface Room {
  room_id: number;
  roomName: string;
  floor_id: number;
  // equipmet: any[];
}

interface Floor {
  floor_id: number;
  floorName: string;
  block_id: number;
  // rooms: any[];
}

export function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<Partial<Room>>({
    roomName: "",
  });

  useEffect(() => {
    fetchRooms();
    fetchFloors();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await api.get("/room");
      setRooms(data);
    } catch (e) {
      console.error("Failed to fetch rooms:", e);
    }
  };

  const fetchFloors = async () => {
    try {
      const { data } = await api.get("/floor");
      setFloors(data);
    } catch (e) {
      console.error("Failed to fetch floors:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/room/${formData.room_id}`, formData);
      } else {
        await api.post("/room", formData);
      }
      fetchRooms();
      setIsOpen(false);
      setFormData({
        room_id: 0,
        roomName: "",
        floor_id: 0,
        // equipment: [],
      });
      setIsEdit(false);
    } catch (e) {
      console.error("Failed to save room:", e);
    }
  };

  const handleEdit = (room: Room) => {
    setFormData(room);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleDelete = async (roomId: number) => {
    try {
      await api.delete(`/room/${roomId}`);
      fetchRooms();
    } catch (e) {
      console.error("Failed to delete room:", e);
    }
  };

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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    {floors.map((floor) => (
                      <SelectItem
                        key={floor.floor_id}
                        value={String(floor.floor_id)}
                      >
                        {floor.floorName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div>
                <Label htmlFor="type">Room Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="meeting">Meeting Room</SelectItem>
                    <SelectItem value="storage">Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
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
              <TableHead>Floor</TableHead>
              {/* <TableHead>Type</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.room_id}>
                <TableCell>{room.room_id}</TableCell>
                <TableCell>{room.roomName}</TableCell>
                <TableCell>
                  {floors.find((floor) => floor.floor_id === room.floor_id)
                    ?.floorName || "Unknown"}
                </TableCell>
                {/* <TableCell>{room.type}</TableCell> */}
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                    onClick={() => handleEdit(room)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(room.room_id)}
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
