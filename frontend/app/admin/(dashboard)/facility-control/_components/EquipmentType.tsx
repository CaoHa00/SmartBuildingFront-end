'use client';

import { useState, useEffect } from 'react';
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
  equipmentId: number;  // Matches the DTO
  equipmentTypeName: string;  // Matches the DTO
  equipments: any[];  // Matches the DTO
}

const EquipmentTypeManagement = () => {
  const { toast } = useToast();
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [newType, setNewType] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchEquipmentTypes();
  }, []);

  const fetchEquipmentTypes = async () => {
    try {
      const response = await api.get<EquipmentType[]>('/equipmentType');
      setEquipmentTypes(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch equipment types",
      });
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
      await api.post('/equipmentType', {
        equipmentTypeName: newType
      });
      setNewType('');
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

  const handleUpdate = async (id: number) => {

    try {
      await api.put(`/equipmentType/${id}`, {
        equipmentTypeName: editName
      });
      setEditingId(null);
      setEditName('');
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

  const handleDelete = async (id: number) => {
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
            {equipmentTypes.map((type) => (
              <TableRow key={type.equipmentId}>
                <TableCell>
                  {type.equipmentId}
                </TableCell>
                <TableCell>
                  {editingId === type.equipmentId ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    type.equipmentTypeName
                  )}
                </TableCell>
                <TableCell>
                  {editingId === type.equipmentId ? (
                    <Button
                      className="mr-2 bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                      onClick={() => handleUpdate(type.equipmentId)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                      onClick={() => {
                        setEditingId(type.equipmentId);
                        setEditName(type.equipmentTypeName);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(type.equipmentId)}
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
};

export default EquipmentTypeManagement;