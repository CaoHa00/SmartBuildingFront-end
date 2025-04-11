"use client";

import React from "react";
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
import {
  ChevronDown,
  ChevronRight,
  Building2,
  DoorClosed,
  Cpu,
  Circle,
  CirclePlus,
} from "lucide-react";

interface Equipment {
  equipmentId: number;
  equipmentName: string;
  deviceId: string;
}

interface Room {
  roomId: number;
  roomName: string;
  equipments: Equipment[];
}

interface Floor {
  floorId: number;
  floorName: string;
  rooms: Room[];
}

interface Block {
  blockId: number;
  blockName: string;
  floors: Floor[];
}

interface NewBlockData {
  blockName: string;
}

interface NewFloorData {
  blockId: number;
  floorName: string;
}

interface NewRoomData {
  floorId: number;
  roomName: string;
}

interface NewEquipmentData {
  roomId: number;
  equipmentName: string;
  deviceId: string;
}

function ExpandableRow({
  isOpen,
  onClick,
  level = 0,
  icon: Icon,
  name,
  count,
  id,
}: {
  isOpen: boolean;
  onClick: () => void;
  level?: number;
  icon: any;
  name: string;
  count?: number;
  id?: number;
}) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      style={{ paddingLeft: `${level * 20}px` }}
      onClick={onClick}
    >
      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      <Icon size={16} />
      <span>
        {name}{" "}
        {id && <span className="text-sm text-muted-foreground">(ID: {id})</span>}
      </span>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">({count})</span>
      )}
    </div>
  );
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
  const [expandedBlocks, setExpandedBlocks] = useState<Record<number, boolean>>(
    {}
  );
  const [expandedFloors, setExpandedFloors] = useState<Record<number, boolean>>(
    {}
  );
  const [expandedRooms, setExpandedRooms] = useState<Record<number, boolean>>(
    {}
  );

  const [isFloorDialogOpen, setIsFloorDialogOpen] = useState(false);
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false);

  const [floorFormData, setFloorFormData] = useState<
    Partial<Floor & { blockId: number }>
  >({});
  const [roomFormData, setRoomFormData] = useState<
    Partial<Room & { floorId: number }>
  >({});
  const [equipmentFormData, setEquipmentFormData] = useState<
    Partial<Equipment & { roomId: number }>
  >({});

  const [isFloorEdit, setIsFloorEdit] = useState(false);
  const [isRoomEdit, setIsRoomEdit] = useState(false);
  const [isEquipmentEdit, setIsEquipmentEdit] = useState(false);

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

  const handleFloorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isFloorEdit) {
        await api.put(`/floor/${floorFormData.floorId}`, floorFormData);
      } else {
        const newFloor: NewFloorData = {
          blockId: floorFormData.blockId!,
          floorName: floorFormData.floorName || "",
        };
        await api.post("/floor", newFloor);
      }
      fetchBlocks();
      setIsFloorDialogOpen(false);
      setFloorFormData({});
      setIsFloorEdit(false);
      toast({
        title: "Success",
        description: `Floor ${
          isFloorEdit ? "updated" : "created"
        } successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isFloorEdit ? "update" : "create"} floor`,
      });
    }
  };

  const handleRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRoomEdit) {
        await api.put(`/room/${roomFormData.roomId}`, roomFormData);
      } else {
        const newRoom: NewRoomData = {
          floorId: roomFormData.floorId!,
          roomName: roomFormData.roomName || "",
        };
        await api.post("/room", newRoom);
      }
      fetchBlocks();
      setIsRoomDialogOpen(false);
      setRoomFormData({});
      setIsRoomEdit(false);
      toast({
        title: "Success",
        description: `Room ${isRoomEdit ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isRoomEdit ? "update" : "create"} room`,
      });
    }
  };

  const handleEquipmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEquipmentEdit) {
        await api.put(
          `/equipment/${equipmentFormData.equipmentId}`,
          equipmentFormData
        );
      } else {
        const newEquipment: NewEquipmentData = {
          roomId: equipmentFormData.roomId!,
          equipmentName: equipmentFormData.equipmentName || "",
          deviceId: equipmentFormData.deviceId || "",
        };
        await api.post("/equipment", newEquipment);
      }
      fetchBlocks();
      setIsEquipmentDialogOpen(false);
      setEquipmentFormData({});
      setIsEquipmentEdit(false);
      toast({
        title: "Success",
        description: `Equipment ${
          isEquipmentEdit ? "updated" : "created"
        } successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${
          isEquipmentEdit ? "update" : "create"
        } equipment`,
      });
    }
  };

  const handleDeleteFloor = async (floorId: number) => {
    try {
      await api.delete(`/floor/${floorId}`);
      fetchBlocks();
      toast({
        title: "Success",
        description: "Floor deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete floor",
      });
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    try {
      await api.delete(`/room/${roomId}`);
      fetchBlocks();
      toast({
        title: "Success",
        description: "Room deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete room",
      });
    }
  };

  const handleDeleteEquipment = async (equipmentId: number) => {
    try {
      await api.delete(`/equipment/${equipmentId}`);
      fetchBlocks();
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

  const toggleBlock = (blockId: number) => {
    setExpandedBlocks((prev) => ({ ...prev, [blockId]: !prev[blockId] }));
  };

  const toggleFloor = (floorId: number) => {
    setExpandedFloors((prev) => ({ ...prev, [floorId]: !prev[floorId] }));
  };

  const toggleRoom = (roomId: number) => {
    setExpandedRooms((prev) => ({ ...prev, [roomId]: !prev[roomId] }));
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
                <React.Fragment key={block.blockId}>
                  <TableRow className="hover:bg-[hsl(var(--tech-blue))/5]">
                    <TableCell>
                      <ExpandableRow
                        isOpen={expandedBlocks[block.blockId] || false}
                        onClick={() => toggleBlock(block.blockId)}
                        icon={Building2}
                        name={block.blockName}
                        count={block.floors.length}
                        id={block.blockId}
                      />
                    </TableCell>
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
                      <Button
                        variant="outline"
                        className="ml-2"
                        onClick={() => {
                          setFloorFormData({ blockId: block.blockId });
                          setIsFloorEdit(false);
                          setIsFloorDialogOpen(true);
                        }}
                      >
                        <CirclePlus />
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedBlocks[block.blockId] &&
                    block.floors.map((floor) => (
                      <React.Fragment key={`${block.blockId}-${floor.floorId}`}>
                        <TableRow className="bg-muted/50">
                          <TableCell>
                            <ExpandableRow
                              isOpen={expandedFloors[floor.floorId] || false}
                              onClick={() => toggleFloor(floor.floorId)}
                              icon={DoorClosed}
                              name={floor.floorName}
                              count={floor.rooms.length}
                              level={1}
                              id={floor.floorId}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              className="mr-2"
                              onClick={() => {
                                setFloorFormData(floor);
                                setIsFloorEdit(true);
                                setIsFloorDialogOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteFloor(floor.floorId)}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="outline"
                              className="ml-2"
                              onClick={() => {
                                setRoomFormData({ floorId: floor.floorId });
                                setIsRoomEdit(false);
                                setIsRoomDialogOpen(true);
                              }}
                            >
                              <CirclePlus />
                            </Button>
                          </TableCell>
                        </TableRow>
                        {expandedFloors[floor.floorId] &&
                          floor.rooms.map((room) => (
                            <React.Fragment
                              key={`${block.blockId}-${floor.floorId}-${room.roomId}`}
                            >
                              <TableRow className="bg-muted/30">
                                <TableCell>
                                  <ExpandableRow
                                    isOpen={expandedRooms[room.roomId] || false}
                                    onClick={() => toggleRoom(room.roomId)}
                                    icon={DoorClosed}
                                    name={room.roomName}
                                    count={room.equipments.length}
                                    level={2}
                                    id={room.roomId}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="outline"
                                    className="mr-2"
                                    onClick={() => {
                                      setRoomFormData(room);
                                      setIsRoomEdit(true);
                                      setIsRoomDialogOpen(true);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() =>
                                      handleDeleteRoom(room.roomId)
                                    }
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="ml-2"
                                    onClick={() => {
                                      setEquipmentFormData({
                                        roomId: room.roomId,
                                      });
                                      setIsEquipmentEdit(false);
                                      setIsEquipmentDialogOpen(true);
                                    }}
                                  >
                                    <CirclePlus />
                                  </Button>
                                </TableCell>
                              </TableRow>
                              {expandedRooms[room.roomId] &&
                                room.equipments.map((equipment) => (
                                  <TableRow
                                    key={`${block.blockId}-${floor.floorId}-${room.roomId}-${equipment.equipmentId}`}
                                    className="bg-muted/20"
                                  >
                                    <TableCell>
                                      <div
                                        className="flex items-center gap-2"
                                        style={{ paddingLeft: "60px" }}
                                      >
                                        <Cpu size={16} />
                                        <span>{equipment.equipmentName}</span>
                                        <span className="text-sm text-muted-foreground">
                                          (ID: {equipment.equipmentId}, Device
                                          ID: {equipment.deviceId})
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="outline"
                                        className="mr-2"
                                        onClick={() => {
                                          setEquipmentFormData(equipment);
                                          setIsEquipmentEdit(true);
                                          setIsEquipmentDialogOpen(true);
                                        }}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={() =>
                                          handleDeleteEquipment(
                                            equipment.equipmentId
                                          )
                                        }
                                      >
                                        Delete
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </React.Fragment>
                          ))}
                      </React.Fragment>
                    ))}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isFloorDialogOpen} onOpenChange={setIsFloorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-neutral-700">
              {isFloorEdit ? "Edit Floor" : "Add New Floor"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFloorSubmit} className="space-y-4">
            <div>
              <Label htmlFor="floorName" className="text-neutral-700">
                Floor Name
              </Label>
              <Input
                id="floorName"
                value={floorFormData.floorName || ""}
                onChange={(e) =>
                  setFloorFormData({
                    ...floorFormData,
                    floorName: e.target.value,
                  })
                }
                required
              />
            </div>
            <Button type="submit">{isFloorEdit ? "Update" : "Save"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isRoomDialogOpen} onOpenChange={setIsRoomDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-neutral-700">
              {isRoomEdit ? "Edit Room" : "Add New Room"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRoomSubmit} className="space-y-4">
            <div>
              <Label htmlFor="roomName" className="text-neutral-700">
                Room Name
              </Label>
              <Input
                id="roomName"
                value={roomFormData.roomName || ""}
                onChange={(e) =>
                  setRoomFormData({ ...roomFormData, roomName: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit">{isRoomEdit ? "Update" : "Save"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEquipmentDialogOpen}
        onOpenChange={setIsEquipmentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-neutral-700">
              {isEquipmentEdit ? "Edit Equipment" : "Add New Equipment"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEquipmentSubmit} className="space-y-4">
            <div>
              <Label htmlFor="equipmentName" className="text-neutral-700">
                Equipment Name
              </Label>
              <Input
                id="equipmentName"
                value={equipmentFormData.equipmentName || ""}
                onChange={(e) =>
                  setEquipmentFormData({
                    ...equipmentFormData,
                    equipmentName: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="deviceId" className="text-neutral-700">
                Device ID
              </Label>
              <Input
                id="deviceId"
                value={equipmentFormData.deviceId || ""}
                onChange={(e) =>
                  setEquipmentFormData({
                    ...equipmentFormData,
                    deviceId: e.target.value,
                  })
                }
                required
              />
            </div>
            <Button type="submit">{isEquipmentEdit ? "Update" : "Save"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
