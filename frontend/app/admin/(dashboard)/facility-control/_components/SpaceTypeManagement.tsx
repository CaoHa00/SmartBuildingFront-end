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
import { Building2 } from "lucide-react";
import { SpaceType, NewSpaceTypeData } from "@/types/space";

export function SpaceTypeManagement() {
  const { toast } = useToast();
  const [spaceTypes, setSpaceType] = useState<SpaceType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<SpaceType>>({
    spaceTypeName: "",
    spaceLevel: 0,
  });

  useEffect(() => {
    fetchSpaceTypes();
  }, []);

  const fetchSpaceTypes = async () => {
    try {
      setLoading(true);
      const response = await api.get<SpaceType[]>("/space-types");
      if (response.data.length > 0) {
        const sortedData = response.data.sort(
          (a, b) => a.spaceLevel - b.spaceLevel
        );
        setSpaceType(sortedData);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch space types",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/space-types/${formData.spaceTypeId}`, formData);
      } else {
        const newSpaceType: NewSpaceTypeData = {
          spaceTypeName: formData.spaceTypeName || "",
          spaceLevel: formData.spaceLevel || 0,
        };
        await api.post("/space-types", newSpaceType);
      }
      fetchSpaceTypes();
      setIsOpen(false);
      setFormData({ spaceTypeName: "" });
      setIsEdit(false);
      toast({
        title: "Success",
        description: `Space Type ${
          isEdit ? "updated" : "created"
        } successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "create"} space type`,
      });
    }
  };

  const handleDelete = async (spaceId: string) => {
    try {
      await api.delete(`/space-types/${spaceId}`);
      fetchSpaceTypes();
      toast({
        title: "Success",
        description: "Space type deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete space type",
      });
    }
  };

  const handleEdit = (spaceType: SpaceType) => {
    setFormData(spaceType);
    setIsEdit(true);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
          Space Type Management
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
              onClick={() => {
                setIsEdit(false);
                setFormData({
                  spaceTypeName: "",
                });
              }}
            >
              Add New Space Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                {isEdit ? "Edit Space" : "Add New Space"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-xl text-neutral-700"
            >
              <div>
                <Label htmlFor="spaceTypeName">Space Type Name</Label>
                <Input
                  id="spaceTypeName"
                  className="mb-3"
                  value={formData.spaceTypeName}
                  onChange={(e) =>
                    setFormData({ ...formData, spaceTypeName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="spaceTypeLevel">Space Type Level</Label>
                <Input
                  id="spaceTypeLevel"
                  className="mb-3"
                  value={formData.spaceLevel === 0 ? 0 : formData.spaceLevel}
                  onChange={
                    !isEdit
                      ? (e) =>
                          setFormData({
                            ...formData,
                            spaceLevel: Number(e.target.value || 0),
                          })
                      : undefined
                  }
                  required
                  disabled={isEdit}
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
              <TableHead>Level</TableHead>
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
              spaceTypes.map((spaceType) => (
                <React.Fragment key={spaceType.spaceTypeId}>
                  <TableRow className="hover:bg-[hsl(var(--tech-blue))/5]">
                    <TableCell>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Building2 size={16} />
                        <span>{spaceType.spaceTypeName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <span>{spaceType.spaceLevel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                        onClick={() => handleEdit(spaceType)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="mr-2"
                        variant="destructive"
                        onClick={() => handleDelete(spaceType.spaceTypeId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>

    //modal for delete confirmation
  );
}
