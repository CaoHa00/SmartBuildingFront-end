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
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Equipment, EquipmentType, NewEquipmentData } from "@/types/equipment";
import { Space, SpaceType, NewSpaceData } from "@/types/space";
import { Category } from "@/types/category";
import { DeleteConfirmModal } from "@/components/delete-confirmation";

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
  id?: string;
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
        {id && (
          <span className="text-sm text-muted-foreground">(ID: {id})</span>
        )}
      </span>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">({count})</span>
      )}
    </div>
  );
}

function FacilityDialog({
  space,
  spaceTypes,
  isEdit,
  onClose,
  onSubmit,
  formData,
  setFormData,
}: {
  space: Space;
  spaceTypes: SpaceType[];
  isEdit: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: Partial<Space>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Space>>>;
}) {
  const isRoot = space.spaceName === "root";

  const parentType = isRoot
    ? null
    : spaceTypes.find((type) => type.spaceTypeId === space.spaceTypeId);

  const targetLevel = parentType ? parentType.spaceLevel + 1 : 1;

  const options = spaceTypes.filter((type) => type.spaceLevel === targetLevel);

  const isLastLevel = options.length === 0;

  useEffect(() => {
    if (space?.spaceName === "root") {
      setFormData((prev) => ({
        ...prev,
        parentId: null,
        spaceTypeId: "",
        spaceTypeName: "",
      }));
    } else if (space) {
      setFormData((prev) => ({
        ...prev,
        parentId: space.spaceId,
        spaceTypeId: "",
        spaceTypeName: "",
      }));
    }
  }, [space]);

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
            {isEdit ? "Edit Space" : "Add New Facility"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className="space-y-4 text-xl text-neutral-700"
        >
          <div>
            <Label htmlFor="blockName">Facility Name</Label>
            <Input
              id="blockName"
              className="mb-3"
              value={formData.spaceName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  spaceName: e.target.value,
                })
              }
              required
            />
            <Label htmlFor="selectSpaceType">Facility Type</Label>
            <div id="selectSpaceType">
              <Select
                value={formData.spaceTypeId || ""}
                onValueChange={(value) => {
                  const selected = spaceTypes.find(
                    (type) => type.spaceTypeId === value
                  );
                  setFormData({
                    ...formData,
                    spaceTypeId: value || "",
                    spaceTypeName: selected?.spaceTypeName || "",
                  });
                }}
                disabled={isLastLevel}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Space Type" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((type) => (
                    <SelectItem key={type.spaceTypeId} value={type.spaceTypeId}>
                      {type.spaceTypeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SpaceManagement() {
  const { toast } = useToast();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [spaceTypes, setSpaceType] = useState<SpaceType[]>([]);
  const [currentParent, setCurrentParent] = useState<Space | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Space>>({
    spaceName: "",
    spaceTypeId: "",
    spaceTypeName: "",
    parentId: null,
  });
  const [expandedSpaces, setExpandedSpaces] = useState<Record<string, boolean>>(
    {}
  );
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [viewMode, setViewMode] = useState<
    "spaceManagement" | "equipmentTable"
  >("spaceManagement");
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false);
  const [equipmentFormData, setEquipmentFormData] = useState<
    Partial<Equipment & { spaceId: string }>
  >({});
  const [isEquipmentEdit, setIsEquipmentEdit] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteSpaceId, setDeleteSpaceId] = useState<string | null>(null);
  const [deleteEquipmentId, setDeleteEquipmentId] = useState<number | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchSpaces();
    fetchSpaceTypes();
    fetchEquipmentTypes();
    fetchCategories();
  }, []);

  const openDialogFor = (id: string) => {
    setOpenDialogs((prev) => ({ ...prev, [id]: true }));
  };

  const closeDialogFor = (id: string) => {
    setOpenDialogs((prev) => ({ ...prev, [id]: false }));
  };

  const fetchSpaces = async () => {
    try {
      setLoading(true);
      const response = await api.get<Space[]>("/spaces/all");
      if (response.data.length > 0) {
        setSpaces(response.data);
      }
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch spaces",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchSpaceTypes = async () => {
    try {
      setLoading(true);
      const response = await api.get<SpaceType[]>("/space-types");
      if (response.data.length > 0) {
        setSpaceType(response.data);
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

  const fetchEquipmentTypes = async () => {
    try {
      const response = await api.get<EquipmentType[]>("/equipmentType");
      setEquipmentTypes(response.data);
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
      const response = await api.get<Category[]>("/category");
      setCategories(response.data);
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
    try {
      if (isEdit) {
        await api.put(`/spaces/${formData.spaceId}`, formData);
      } else {
        const newSpace: NewSpaceData = {
          spaceName: formData.spaceName || "",
          spaceTypeId: formData.spaceTypeId || "",
          spaceTypeName: formData.spaceTypeName || "",
          parentId: formData.parentId ?? null,
          equipment: [],
          children: [],
        };
        console.log(newSpace);
        await api.post("/spaces", newSpace);
      }
      fetchSpaces();
      const dialogId = formData.parentId ?? "root";
      closeDialogFor(dialogId);
      setIsOpen(false);
      setFormData({
        spaceName: "",
        spaceTypeId: "",
        spaceTypeName: "",
        parentId: null,
      });
      setIsEdit(false);
      toast({
        title: "Success",
        description: `Space ${isEdit ? "updated" : "created"} successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "create"} block`,
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteSpaceId) return;
    try {
      setIsDeleting(true);
      await api.delete(`/spaces/${deleteSpaceId}`);
      fetchSpaces();
      toast({
        title: "Success",
        description: "Space deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete space",
      });
    } finally {
      setDeleteSpaceId(null);
      setIsDeleting(false);
    }
  };

  const handleEdit = (space: Space) => {
    setFormData(space);
    setIsEdit(true);
    setCurrentParent(space);
    setIsOpen(true);
  };

  const handleEquipmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEquipmentEdit) {
        const response = await api.put(
          `/equipment/${equipmentFormData.equipmentId}`,
          equipmentFormData
        );
        if (selectedSpace) {
          const updatedEquipment = response.data;
          setSelectedSpace((prev) =>
            prev
              ? {
                  ...prev,
                  equipments: prev.equipments.map((eq) =>
                    eq.equipmentId === updatedEquipment.equipmentId
                      ? updatedEquipment
                      : eq
                  ),
                }
              : null
          );
        }
      } else {
        const newEquipment: NewEquipmentData = {
          equipmentName: equipmentFormData.equipmentName || "",
          deviceId: equipmentFormData.deviceId || "",
          equipmentTypeId: equipmentFormData.equipmentTypeId || "",
          categoryId: equipmentFormData.categoryId || 0,
          spaceId: equipmentFormData.spaceId || "",
        };
        const response = await api.post(`/equipment`, newEquipment);
        const createdEquipment = response.data;
        setSelectedSpace((prev) =>
          prev
            ? {
                ...prev,
                equipments: [...prev.equipments, createdEquipment],
              }
            : null
        );
      }
      fetchSpaces();
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

  const confirmDeleteEquipment = async () => {
    if (!deleteEquipmentId) return;
    try {
      setIsDeleting(true);
      await api.delete(`/equipment/${deleteEquipmentId}`);
      setSelectedSpace((prev) =>
        prev
          ? {
              ...prev,
              equipments: prev.equipments.filter(
                (eq) => eq.equipmentId !== deleteEquipmentId
              ),
            }
          : null
      );
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
    } finally {
      setDeleteSpaceId(null);
      setIsDeleting(false);
    }
  };

  const toggleSpace = (spaceId: string) => {
    setExpandedSpaces((prev) => ({ ...prev, [spaceId]: !prev[spaceId] }));
  };

  return (
    <>
      <div className="space-y-4">
        {viewMode === "spaceManagement" && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
                Facility Management
              </h2>
              <Button
                className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                onClick={() => {
                  const rootSpaceType = spaceTypes.find(
                    (type) => type.spaceLevel === 1
                  );
                  if (!rootSpaceType) return;

                  setFormData({
                    spaceName: "",
                    spaceTypeId: rootSpaceType.spaceTypeId || "",
                    spaceTypeName: rootSpaceType.spaceTypeName || "",
                  });
                  setCurrentParent({
                    spaceName: "root",
                    spaceTypeId: "",
                  } as Space);
                  setIsEdit(false);
                  setIsOpen(true);
                }}
              >
                Add New Facility
              </Button>

              {isOpen && currentParent && (
                <FacilityDialog
                  space={currentParent}
                  spaceTypes={spaceTypes}
                  isEdit={isEdit}
                  formData={formData}
                  setFormData={setFormData}
                  onClose={() => setIsOpen(false)}
                  onSubmit={handleSubmit}
                />
              )}
            </div>

            <div className="rounded-md border border-border text-neutral-700">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[hsl(var(--tech-blue))/5]">
                    <TableHead>Name</TableHead>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Add</TableHead>
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
                    spaces.map((space) => (
                      <React.Fragment key={space.spaceId}>
                        <TableRow className="hover:bg-[hsl(var(--tech-blue))/5]">
                          <TableCell>
                            <ExpandableRow
                              isOpen={expandedSpaces[space.spaceId] || false}
                              onClick={() => toggleSpace(space.spaceId)}
                              icon={Building2}
                              name={space.spaceName}
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              className="border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                              onClick={() => {
                                setSelectedSpace(space);
                                setViewMode("equipmentTable");
                              }}
                            >
                              View Equipment
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                              onClick={() => handleEdit(space)}
                            >
                              Edit
                            </Button>
                            <Button
                              className="mr-2"
                              variant="destructive"
                              onClick={() => setDeleteSpaceId(space.spaceId)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                              onClick={() => {
                                setIsEdit(false);
                                setFormData({
                                  spaceName: "",
                                  spaceTypeId: "",
                                });
                                setCurrentParent(space);
                                openDialogFor(space.spaceId);
                              }}
                            >
                              Add New Facility
                            </Button>
                            {openDialogs[space.spaceId] && (
                              <FacilityDialog
                                space={space}
                                spaceTypes={spaceTypes}
                                isEdit={false}
                                formData={formData}
                                setFormData={setFormData}
                                onClose={() => closeDialogFor(space.spaceId)}
                                onSubmit={handleSubmit}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                        {expandedSpaces[space.spaceId] &&
                          space.children.map((childSpace) => (
                            <React.Fragment
                              key={`${space.spaceId}-${childSpace.spaceId}`}
                            >
                              <TableRow className="bg-muted/50">
                                <TableCell>
                                  <ExpandableRow
                                    isOpen={
                                      expandedSpaces[childSpace.spaceId] ||
                                      false
                                    }
                                    onClick={() =>
                                      toggleSpace(childSpace.spaceId)
                                    }
                                    icon={DoorClosed}
                                    name={childSpace.spaceName}
                                    level={1}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    className="border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedSpace(childSpace);
                                      setViewMode("equipmentTable");
                                    }}
                                  >
                                    View Equipment
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="outline"
                                    className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                                    onClick={() => {
                                      setFormData(childSpace);
                                      setIsEdit(true);
                                      setIsOpen(true);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    className="mr-2"
                                    variant="destructive"
                                    onClick={() =>
                                      setDeleteSpaceId(childSpace.spaceId)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                                    onClick={() => {
                                      setIsEdit(false);
                                      setFormData({
                                        spaceName: "",
                                        spaceTypeId: "",
                                      });
                                      openDialogFor(childSpace.spaceId);
                                    }}
                                  >
                                    Add New Facility
                                  </Button>
                                  {openDialogs[childSpace.spaceId] && (
                                    <FacilityDialog
                                      space={childSpace}
                                      spaceTypes={spaceTypes}
                                      isEdit={isEdit}
                                      formData={formData}
                                      setFormData={setFormData}
                                      onClose={() =>
                                        closeDialogFor(childSpace.spaceId)
                                      }
                                      onSubmit={handleSubmit}
                                    />
                                  )}
                                </TableCell>
                              </TableRow>
                              {expandedSpaces[childSpace.spaceId] &&
                                childSpace.children.map((grandchildSpace) => (
                                  <React.Fragment
                                    key={`${space.spaceId}-${childSpace.spaceId}-${grandchildSpace.spaceId}`}
                                  >
                                    <TableRow className="bg-muted/30">
                                      <TableCell>
                                        <div
                                          className="flex items-center gap-2"
                                          style={{ paddingLeft: "60px" }}
                                        >
                                          <DoorClosed size={16} />
                                          <span>
                                            {grandchildSpace.spaceName}
                                          </span>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          className="border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                                          variant="outline"
                                          onClick={() => {
                                            setSelectedSpace(grandchildSpace);
                                            setViewMode("equipmentTable");
                                          }}
                                        >
                                          View Equipment
                                        </Button>
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          variant="outline"
                                          className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
                                          onClick={() => {
                                            setFormData(grandchildSpace);
                                            setIsEdit(true);
                                            setIsOpen(true);
                                          }}
                                        >
                                          Edit
                                        </Button>
                                        <Button
                                          className="mr-2"
                                          variant="destructive"
                                          onClick={() =>
                                            setDeleteSpaceId(
                                              grandchildSpace.spaceId
                                            )
                                          }
                                        >
                                          Delete
                                        </Button>
                                      </TableCell>
                                      <TableCell>
                                        {/* <Dialog
                                          open={isOpen}
                                          onOpenChange={setIsOpen}
                                        >
                                          <DialogTrigger asChild>
                                            <Button
                                              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                                              onClick={() => {
                                                setIsEdit(false);
                                                setFormData({
                                                  spaceName: "",
                                                });
                                              }}
                                            >
                                              Add New Facility
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                                                {isEdit
                                                  ? "Edit Space"
                                                  : "Add New Space"}
                                              </DialogTitle>
                                            </DialogHeader>
                                            <form
                                              onSubmit={handleSubmit}
                                              className="space-y-4 text-xl text-neutral-700"
                                            >
                                              <div>
                                                <Label htmlFor="blockName">
                                                  Facility Name
                                                </Label>
                                                <Input
                                                  id="blockName"
                                                  className="mb-3"
                                                  value={formData.spaceName}
                                                  onChange={(e) =>
                                                    setFormData({
                                                      ...formData,
                                                      spaceName: e.target.value,
                                                    })
                                                  }
                                                  required
                                                />
                                                <Label htmlFor="selectSpaceType">
                                                  Facility Type
                                                </Label>
                                                <div id="selectSpaceType">
                                                  <Select
                                                    value={formData.spaceTypeId}
                                                    onValueChange={(value) => {
                                                      const selected =
                                                        spaceTypes.find(
                                                          (type) =>
                                                            type.spaceTypeId ===
                                                            value
                                                        );
                                                      setFormData({
                                                        ...formData,
                                                        spaceTypeId:
                                                          selected?.spaceTypeId ||
                                                          "",
                                                        spaceTypeName:
                                                          selected?.spaceTypeName ||
                                                          "",
                                                      });
                                                    }}
                                                  >
                                                    <SelectTrigger>
                                                      <SelectValue placeholder="Select Space Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      {(() => {
                                                        const parentType =
                                                          spaceTypes.find(
                                                            (type) =>
                                                              type.spaceTypeId ===
                                                              grandchildSpace.spaceTypeId
                                                          );
                                                        const nextLevel =
                                                          parentType
                                                            ? parentType.spaceLevel +
                                                              1
                                                            : null;

                                                        return spaceTypes
                                                          .filter(
                                                            (type) =>
                                                              type.spaceLevel ===
                                                              nextLevel
                                                          )
                                                          .map((type) => (
                                                            <SelectItem
                                                              key={
                                                                type.spaceTypeId
                                                              }
                                                              value={
                                                                type.spaceTypeId
                                                              }
                                                            >
                                                              {
                                                                type.spaceTypeName
                                                              }
                                                            </SelectItem>
                                                          ));
                                                      })()}
                                                    </SelectContent>
                                                  </Select>
                                                </div>
                                              </div>
                                              <Button type="submit">
                                                {isEdit ? "Update" : "Save"}
                                              </Button>
                                            </form>
                                          </DialogContent>
                                        </Dialog> */}
                                        <Button
                                          className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                                          onClick={() => {
                                            setIsEdit(false);
                                            setFormData({
                                              spaceName: "",
                                              spaceTypeId: "",
                                            });
                                            openDialogFor(
                                              grandchildSpace.spaceId
                                            );
                                          }}
                                        >
                                          Add New Facility
                                        </Button>
                                        {openDialogs[
                                          grandchildSpace.spaceId
                                        ] && (
                                          <FacilityDialog
                                            space={grandchildSpace}
                                            spaceTypes={spaceTypes}
                                            isEdit={isEdit}
                                            formData={formData}
                                            setFormData={setFormData}
                                            onClose={() =>
                                              closeDialogFor(
                                                grandchildSpace.spaceId
                                              )
                                            }
                                            onSubmit={handleSubmit}
                                          />
                                        )}
                                      </TableCell>
                                    </TableRow>
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
          </>
        )}
        {viewMode === "equipmentTable" && selectedSpace && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
                List of Equipment in {selectedSpace.spaceTypeName}{" "}
                {selectedSpace.spaceName}
              </h2>
              <Dialog
                open={isEquipmentDialogOpen}
                onOpenChange={setIsEquipmentDialogOpen}
              >
                <div>
                  <Button
                    className="mr-2"
                    variant="outline"
                    onClick={() => {
                      setIsEquipmentDialogOpen(false);
                      setIsEquipmentEdit(false);
                      setEquipmentFormData({ equipmentName: "", deviceId: "" });
                      setSelectedSpace(null);
                      setViewMode("spaceManagement");
                    }}
                  >
                    ← Back to Block List
                  </Button>
                  <Button
                    className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
                    onClick={() => {
                      setIsEquipmentEdit(false);
                      setEquipmentFormData({
                        equipmentName: "",
                        deviceId: "",
                        equipmentTypeId: "",
                        categoryId: 0,
                        spaceId: selectedSpace.spaceId,
                      });
                      setIsEquipmentDialogOpen(true);
                    }}
                  >
                    Add New Equipment
                  </Button>
                </div>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-xl text-[hsl(var(--tech-dark-blue))]">
                      {isEdit ? "Edit Equipment" : "Add New Equipment"}
                    </DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleEquipmentSubmit}
                    className="space-y-4 text-xl text-neutral-700"
                  >
                    <div>
                      <Label
                        htmlFor="equipmentName"
                        className="text-neutral-700"
                      >
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
                        className="mb-3"
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
                      <Label htmlFor="selectEquipmentType">
                        Equipment Type
                      </Label>
                      <div id="selectEquipmentType" className="mb-3">
                        <Select
                          value={equipmentFormData.equipmentTypeId}
                          onValueChange={(value) => {
                            const selected = equipmentTypes.find(
                              (type) => type.equipmentTypeId === value
                            );
                            setEquipmentFormData({
                              ...equipmentFormData,
                              equipmentTypeId: selected?.equipmentTypeId || "",
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {equipmentTypes.map((type) => (
                              <SelectItem
                                key={type.equipmentTypeId}
                                value={type.equipmentTypeId}
                              >
                                {type.equipmentTypeName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Label htmlFor="selectCategory">Category</Label>
                      <div id="selectCategory">
                        <Select
                          value={
                            equipmentFormData.categoryId !== null
                              ? String(equipmentFormData.categoryId)
                              : ""
                          }
                          onValueChange={(value) => {
                            const selected = categories.find(
                              (category) =>
                                category.categoryId.toString() === value
                            );
                            setEquipmentFormData({
                              ...equipmentFormData,
                              categoryId: selected?.categoryId,
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.categoryId}
                                value={String(category.categoryId)}
                              >
                                {category.categoryName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit">
                      {isEquipmentEdit ? "Update" : "Save"}
                    </Button>
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
                    selectedSpace?.equipments.map((equipment) => (
                      <React.Fragment key={equipment.equipmentId}>
                        <TableRow className="bg-muted/20">
                          <TableCell>
                            <div
                              className="flex items-center gap-2"
                              style={{ paddingLeft: "60px" }}
                            >
                              <Cpu size={16} />
                              <span>{equipment.equipmentName}</span>
                              <span className="text-sm text-muted-foreground">
                                (ID: {equipment.equipmentId}, Device ID:{" "}
                                {equipment.deviceId})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              className="mr-2 border-[hsl(var(--tech-blue))] text-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-blue))] hover:text-white"
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
                                setDeleteEquipmentId(equipment.equipmentId)
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
          </>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={!!deleteSpaceId}
        onClose={() => setDeleteSpaceId(null)}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title="Delete Space"
        description="Are you sure you want to delete this space? This action cannot be undone."
        confirmText="Delete"
      />

      <DeleteConfirmModal
        isOpen={!!deleteEquipmentId}
        onClose={() => setDeleteEquipmentId(null)}
        onConfirm={confirmDeleteEquipment}
        loading={isDeleting}
        title="Delete Equipment"
        description="Are you sure you want to delete this equipment? This action cannot be undone."
        confirmText="Delete"
      />
    </>
  );
}
