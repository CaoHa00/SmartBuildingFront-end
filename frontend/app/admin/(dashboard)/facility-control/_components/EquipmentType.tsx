"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface EquipmentType {
  equipmentTypeId: string; // Matches the DTO
  equipmentTypeName: string; // Matches the DTO
  equipments: any[]; // Matches the DTO
}

const EquipmentTypeManagement = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [newType, setNewType] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchEquipmentTypes();
  }, []);

  const fetchEquipmentTypes = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<EquipmentType[]>("/equipmentType");
      setEquipmentTypes(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch equipment types",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newType.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Equipment type name cannot be empty",
      });
      return;
    }
    try {
      await api.post("/equipmentType", {
        equipmentTypeName: newType,
      });
      setNewType("");
      fetchEquipmentTypes();
      toast({
        title: "Success",
        description: "Equipment type added successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add equipment type",
      });
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await api.put(`/equipmentType/${id}`, {
        equipmentTypeName: editName,
      }); //backend is making the editted equipment type disappear?
      setEditingId(null);
      setEditName("");
      fetchEquipmentTypes();
      toast({
        title: "Success",
        description: "Equipment type updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update equipment type",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/equipmentType/${id}`);
      fetchEquipmentTypes();
      toast({
        title: "Success",
        description: "Equipment type deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete equipment type",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
            Equipment Type Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input
              placeholder="New equipment type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
            <Button
              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border border-border text-neutral-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : equipmentTypes.length > 0 ? (
              equipmentTypes.map((type) => (
                <TableRow key={type.equipmentTypeId}>
                  <TableCell>{type.equipmentTypeId}</TableCell>
                  <TableCell>
                    {editingId === type.equipmentTypeId ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      type.equipmentTypeName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === type.equipmentTypeId ? (
                      <Button
                        className="mr-2 bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                        onClick={() => handleUpdate(type.equipmentTypeId)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                        onClick={() => {
                          setEditingId(type.equipmentTypeId);
                          setEditName(type.equipmentTypeName);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(type.equipmentTypeId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No equipment types found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>

    //modal for delete confirmation
  );
};

export default EquipmentTypeManagement;
