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
import React from "react";
import { Spinner } from "@/components/ui/spinner";

interface LogValue {
  logValueId: number;
  timeStamp: number;
  valueResponse: number;
  value?: {
    valueId: number;
    valueType?: string;
  };
}

interface Equipment {
  equipmentId: number;
  equipmentName: string;
  deviceId: string;
  equipmentType: {
    equipmentId: number;
    equipmentTypeName: string;
  };
  room: {
    roomId: number;
    roomName: string;
  };
  logValues: LogValue[];
}

interface EquipmentFormData {
  equipmentId?: number;
  equipmentName: string;
  deviceId: string;
  equipmentTypeId: number;
  roomId: number;
}

interface Room {
  roomId: number;
  roomName: string;
  floorId: number;
}

interface EquipmentType {
  equipmentId: number;
  equipmentTypeName: string;
}

export function EquipmentManagement() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<EquipmentFormData>({
    equipmentName: "",
    deviceId: "",
    equipmentTypeId: 0,
    roomId: 0,
  });
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchEquipment();
    fetchRooms();
    fetchEquipmentTypes();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.roomId || !formData.equipmentTypeId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both room and equipment type",
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
        await api.post(`/equipment?roomId=${formData.roomId}&equipmentTypeId=${formData.equipmentTypeId}`, payload);
      }
      fetchEquipment();
      setIsOpen(false);
      setFormData({
        equipmentName: "",
        deviceId: "",
        equipmentTypeId: 0,
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
      deviceId: equipment.deviceId,
      equipmentTypeId: equipment.equipmentType.equipmentId,
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

  const toggleRow = (equipmentId: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(equipmentId)) {
      newExpandedRows.delete(equipmentId);
    } else {
      newExpandedRows.add(equipmentId);
    }
    setExpandedRows(newExpandedRows);
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
                setFormData({ equipmentName: "", deviceId: "", equipmentTypeId: 0, roomId: 0 });
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
                <Label htmlFor="deviceId">Device ID</Label>
                <Input
                  id="deviceId"
                  value={formData.deviceId}
                  onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
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
                  value={String(formData.equipmentTypeId)} 
                  onValueChange={(value) => setFormData({ ...formData, equipmentTypeId: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentTypes.map((type) => (
                      <SelectItem 
                        key={type.equipmentId} 
                        value={String(type.equipmentId)}
                      >
                        {type.equipmentTypeName}
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <Spinner className="mx-auto" />
                </TableCell>
              </TableRow>
            ) : (
              equipment.map((item) => (
                <React.Fragment key={item.equipmentId}>
                  <TableRow 
                    className="cursor-pointer"
                    onClick={() => toggleRow(item.equipmentId)}
                  >
                    <TableCell>{item.equipmentName}</TableCell>
                    <TableCell>{item.deviceId}</TableCell>
                    <TableCell>{item.room.roomName}</TableCell>
                    <TableCell>{item.equipmentType.equipmentTypeName}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.equipmentId);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(item.equipmentId) && item.logValues && item.logValues.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <div className="p-4 bg-gray-50">
                          <h4 className="font-semibold mb-2">Log Values:</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {item.logValues.map((log: LogValue) => (
                              <div key={log.logValueId} className="p-2 bg-white rounded shadow">
                                <div>Timestamp: {new Date(log.timeStamp).toLocaleString()}</div>
                                <div>Value: {log.valueResponse}</div>
                                <div>Type: {log.value?.valueType || 'N/A'}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}