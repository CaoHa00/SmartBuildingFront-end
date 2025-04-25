"use client";

import React, { useState, useEffect } from "react";
import { useSpaces } from "@/hooks/use-spaces";
import { useSpaceTypes } from "@/hooks/use-space-types";
import { useEquipment } from "@/hooks/use-equipment";
import { useEquipmentTypes } from "@/hooks/use-equipment-types";
import { useCategories } from "@/hooks/use-categories";
import { Space, NewSpaceData } from "@/types/space";
import { Equipment } from "@/types/equipment";
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
  spaceTypes: any[];
  isEdit: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: Partial<Space>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Space>>>;
}) {
  const targetLevel = (() => {
    if (isEdit) {
      const type = spaceTypes.find(
        (type) => type.spaceTypeId === formData.spaceTypeId
      );
      return type ? type.spaceLevel : null;
    } else {
      const parentType =
        space.spaceName === "root"
          ? null
          : spaceTypes.find((type) => type.spaceTypeId === space.spaceTypeId);

      return parentType ? parentType.spaceLevel + 1 : 1;
    }
  })();

  const options = spaceTypes.filter((type) =>
    targetLevel !== null ? type.spaceLevel === targetLevel : true
  );

  const isLastLevel = options.length === 0;

  useEffect(() => {
    if (!space) return;

    if (isEdit) {
      setFormData((prev) => ({
        ...prev,
        spaceTypeId: prev.spaceTypeId || space.spaceTypeId,
        spaceTypeName: prev.spaceTypeName || space.spaceTypeName,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        parentId: space.spaceName === "root" ? null : space.spaceId,
        spaceTypeId: "",
        spaceTypeName: "",
      }));
    }
  }, [space, isEdit]);

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
          className="space-y-4 text-xl text-primary-foreground"
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
  const { spaces, loading, isDeleting, fetchSpaces, createSpace, updateSpace, deleteSpace } = useSpaces();
  const { spaceTypes, loading: spaceTypesLoading, fetchSpaceTypes } = useSpaceTypes();
  const { equipment, createEquipment, updateEquipment, deleteEquipment, setEquipment } = useEquipment();
  const { equipmentTypes, fetchEquipmentTypes } = useEquipmentTypes();
  const { categories, fetchCategories } = useCategories();

  const [currentParent, setCurrentParent] = useState<Space | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<Partial<Space>>({
    spaceName: "",
    spaceTypeId: "",
    spaceTypeName: "",
    parentId: null,
  });
  const [expandedSpaces, setExpandedSpaces] = useState<Record<string, boolean>>({});
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [viewMode, setViewMode] = useState<"spaceManagement" | "equipmentTable">("spaceManagement");
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false);
  const [equipmentFormData, setEquipmentFormData] = useState<Partial<Equipment & { spaceId: string }>>({});
  const [isEquipmentEdit, setIsEquipmentEdit] = useState(false);
  const [deleteSpaceId, setDeleteSpaceId] = useState<string | null>(null);
  const [deleteEquipmentId, setDeleteEquipmentId] = useState<number | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    
    if (isEdit && formData.spaceId) {
      success = await updateSpace(formData.spaceId, formData);
    } else {
      const newSpace: NewSpaceData = {
        spaceName: formData.spaceName || "",
        spaceTypeId: formData.spaceTypeId || "",
        spaceTypeName: formData.spaceTypeName || "",
        parentId: formData.parentId ?? null,
        equipment: [],
        children: [],
      };
      success = await createSpace(newSpace);
    }

    if (success) {
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
    }
  };

  const handleEquipmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();   
    if (isEquipmentEdit && equipmentFormData.equipmentId) {
      const updatedEquipment = await updateEquipment(equipmentFormData.equipmentId, equipmentFormData);
      if (selectedSpace) {
        setSelectedSpace((prev) => prev ? {...prev, equipments: prev.equipments.map((eq) => eq.equipmentId === updatedEquipment.equipmentId ? updatedEquipment : eq),}:null);
      }
    } else {
      const equipment = await createEquipment({
        equipmentName: equipmentFormData.equipmentName || "",
        deviceId: equipmentFormData.deviceId || "",
        equipmentTypeId: equipmentFormData.equipmentTypeId || "",
        categoryId: equipmentFormData.categoryId || 0,
        spaceId: equipmentFormData.spaceId || "",
      });
      setSelectedSpace((prev) => prev ? {...prev,equipments:[...prev.equipments, equipment!]}:null)
    }
    fetchSpaces();
    setIsEquipmentDialogOpen(false);
    setEquipmentFormData({});
    setIsEquipmentEdit(false);

  };

  const confirmDelete = async () => {
    if (!deleteSpaceId) return;
    const success = await deleteSpace(deleteSpaceId);
    if (success) {
      setDeleteSpaceId(null);
    }
  };

  const confirmDeleteEquipment = async () => {
    if (!deleteEquipmentId) return;
    const success = await deleteEquipment(deleteEquipmentId);
    setSelectedSpace((prev) => prev ? {...prev, equipments: prev.equipments.filter(eq => eq.equipmentId !== deleteEquipmentId)}:null)
    if (success) {
      setDeleteEquipmentId(null);
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
                className="bg-[#F7CA18] hover:bg-[#FFB61E]"
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
                  <TableRow>
                    <TableHead className="w-[49%]">Name</TableHead>
                    <TableHead className="w-[30%] text-center">
                      Equipment
                    </TableHead>
                    <TableHead className="w-[21%] text-center">
                      Actions
                    </TableHead>
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
                        <TableRow>
                          <TableCell>
                            <ExpandableRow
                              isOpen={expandedSpaces[space.spaceId] || false}
                              onClick={() => toggleSpace(space.spaceId)}
                              icon={Building2}
                              name={space.spaceName}
                            />
                          </TableCell>
                          <TableCell className="flex justify-center">
                            <Button
                              className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
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
                              onClick={() => {
                                setFormData({
                                  spaceId: space.spaceId,
                                  spaceName: space.spaceName,
                                  parentId: space.parentId ?? null,
                                  spaceTypeId: space.spaceTypeId ?? "",
                                  spaceTypeName: space.spaceTypeName ?? "",
                                });
                                setIsEdit(true);
                                setCurrentParent(space);
                                setIsOpen(true);
                              }}
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
                            <Button
                              className="bg-[#F7CA18] hover:bg-[#FFB61E]"
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
                              <TableRow className="bg-background">
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
                                <TableCell className="flex justify-center">
                                  <Button
                                    className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
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
                                      setFormData({
                                        spaceId: childSpace.spaceId,
                                        spaceName: childSpace.spaceName,
                                        parentId: childSpace.parentId ?? null,
                                        spaceTypeId: childSpace.spaceTypeId ?? "",
                                        spaceTypeName:
                                          childSpace.spaceTypeName ?? "",
                                      });
                                      setIsEdit(true);
                                      setCurrentParent(childSpace);
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
                                  <Button
                                    className="bg-[#F7CA18] hover:bg-[#FFB61E]"
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
                                    <TableRow className="bg-background">
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
                                      <TableCell className="flex justify-center">
                                        <Button
                                          className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
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
                                            setFormData({
                                              spaceId: grandchildSpace.spaceId,
                                              spaceName:
                                                grandchildSpace.spaceName,
                                              parentId:
                                                grandchildSpace.parentId ?? null,
                                              spaceTypeId:
                                                grandchildSpace.spaceTypeId ??
                                                "",
                                              spaceTypeName:
                                                grandchildSpace.spaceTypeName ??
                                                "",
                                            });
                                            setIsEdit(true);
                                            setCurrentParent(grandchildSpace);
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
                                        <Button
                                          className="bg-[#F7CA18] hover:bg-[#FFB61E]"
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
                    className="mr-2 text-primary-foreground border bg-background hover:bg-[#205BCC]"
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
                    className="space-y-4 text-xl text-primary-foreground"
                  >
                    <div>
                      <Label
                        htmlFor="equipmentName"
                        className="text-primary-foreground"
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
                      <Label htmlFor="deviceId">Device ID</Label>
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
                  <TableRow>
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
                        <TableRow>
                          <TableCell>
                            <div
                              className="flex items-center gap-2"
                              style={{ paddingLeft: "60px" }}
                            >
                              <Cpu size={16} />
                              <span>{equipment.equipmentName}</span>
                              <span className="text-sm">
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
