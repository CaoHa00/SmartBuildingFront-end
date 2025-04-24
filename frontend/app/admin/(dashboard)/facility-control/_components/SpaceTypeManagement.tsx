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
import { DeleteConfirmModal } from "@/components/delete-confirmation";

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
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      setIsDeleting(true);
      await api.delete(`/space-types/${deleteTargetId}`);
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
    } finally {
      setDeleteTargetId(null);
      setIsDeleting(false);
    }
  };

  const handleEdit = (spaceType: SpaceType) => {
    setFormData(spaceType);
    setIsEdit(true);
    setIsOpen(true);
  };

  return (
    <>
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
                      setFormData({
                        ...formData,
                        spaceTypeName: e.target.value,
                      })
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
              <TableRow>
                <TableHead className="w-[25%]">Name</TableHead>
                <TableHead className="w-[60%] text-center">Level</TableHead>
                <TableHead className="w-[15%] text-center">Actions</TableHead>
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
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 size={16} />
                          <span>{spaceType.spaceTypeName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="mx-auto">
                            {spaceType.spaceLevel}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
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
                          onClick={() =>
                            setDeleteTargetId(spaceType.spaceTypeId)
                          }
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

      <DeleteConfirmModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title="Delete Space Type"
        description="Are you sure you want to delete this space type? This action cannot be undone."
        confirmText="Delete"
      />
    </>
  );
}
