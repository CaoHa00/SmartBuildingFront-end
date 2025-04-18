"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Building2, DoorClosed, Cpu, CirclePlus } from "lucide-react";
import { useBlockManagement } from "@/hooks/use-block-management";
import { ExpandableRow } from "@/components/dialog/ExpandableRow";
import { BlockDialog } from "@/components/dialog/BlockDialog";
import { FloorDialog } from "@/components/dialog/FloorDialog";
import { RoomDialog } from "@/components/dialog/RoomDialog";
import { EquipmentDialog } from "@/components/dialog/EquipmentDialog";
import { Block, Floor, Room, Equipment, NewRoomData } from "@/types/block-management";

export function BlockManagement() {
  const {
    blocks,
    loading,
    equipmentStates,
    fetchBlocks,
    handleAddBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    handleAddFloor,
    handleUpdateFloor,
    handleDeleteFloor,
    handleAddRoom,
    handleUpdateRoom,
    handleDeleteRoom,
    handleAddEquipment,
    handleUpdateEquipment,
    handleDeleteEquipment,
    handleEquipmentControl,
  } = useBlockManagement();

  const [expandedBlocks, setExpandedBlocks] = React.useState<Record<number, boolean>>({});
  const [expandedFloors, setExpandedFloors] = React.useState<Record<number, boolean>>({});
  const [expandedRooms, setExpandedRooms] = React.useState<Record<number, boolean>>({});

  // Dialog states
  const [blockDialogOpen, setBlockDialogOpen] = React.useState(false);
  const [floorDialogOpen, setFloorDialogOpen] = React.useState(false);
  const [roomDialogOpen, setRoomDialogOpen] = React.useState(false);
  const [equipmentDialogOpen, setEquipmentDialogOpen] = React.useState(false);

  // Edit states
  const [editingBlock, setEditingBlock] = React.useState<Block | undefined>();
  const [editingFloor, setEditingFloor] = React.useState<Floor & { blockId: number } | undefined>();
  const [editingRoom, setEditingRoom] = React.useState<Room & { floorId: number } | undefined>();
  const [editingEquipment, setEditingEquipment] = React.useState<Equipment & { roomId: number } | undefined>();

  // Adding states
  const [selectedBlockId, setSelectedBlockId] = React.useState<number>();
  const [selectedFloorId, setSelectedFloorId] = React.useState<number>();
  const [selectedRoomId, setSelectedRoomId] = React.useState<number>();

  React.useEffect(() => {
    fetchBlocks();
  }, []); // Only run once on mount

  const toggleBlock = (blockId: number) => {
    setExpandedBlocks((prev) => ({ ...prev, [blockId]: !prev[blockId] }));
  };

  const toggleFloor = (floorId: number) => {
    setExpandedFloors((prev) => ({ ...prev, [floorId]: !prev[floorId] }));
  };

  const toggleRoom = (roomId: number) => {
    setExpandedRooms((prev) => ({ ...prev, [roomId]: !prev[roomId] }));
  };

  const handleRoomDialogSubmit = async (data: NewRoomData) => {
    console.log("Submitting room data:", { ...data, floorId: selectedFloorId });
    const success = editingRoom
      ? await handleUpdateRoom(editingRoom.roomId, data)
      : await handleAddRoom({ ...data, floorId: selectedFloorId! });
    if (success) {
      setRoomDialogOpen(false);
      // Expand the floor to show the new room
      if (!editingRoom) {
        setExpandedFloors((prev) => ({ ...prev, [selectedFloorId!]: true }));
      }
      await fetchBlocks();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
          Block Management
        </h2>
        <Button
          className="bg-[hsl(var(--tech-blue))] hover:bg-[hsl(var(--tech-dark-blue))]"
          onClick={() => {
            setEditingBlock(undefined);
            setBlockDialogOpen(true);
          }}
        >
          Add New Block
        </Button>
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
                        onClick={() => {
                          setEditingBlock(block);
                          setBlockDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteBlock(block.blockId)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outline"
                        className="ml-2"
                        onClick={() => {
                          setSelectedBlockId(block.blockId);
                          setEditingFloor(undefined);
                          setFloorDialogOpen(true);
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
                                setEditingFloor({ ...floor, blockId: block.blockId });
                                setFloorDialogOpen(true);
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
                                setSelectedFloorId(floor.floorId);
                                setEditingRoom(undefined);
                                setRoomDialogOpen(true);
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
                                      setEditingRoom({ ...room, floorId: floor.floorId });
                                      setRoomDialogOpen(true);
                                    }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteRoom(room.roomId)}
                                  >
                                    Delete
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="ml-2"
                                    onClick={() => {
                                      setSelectedRoomId(room.roomId);
                                      setEditingEquipment(undefined);
                                      setEquipmentDialogOpen(true);
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
                                          (ID: {equipment.equipmentId}, Device ID: {equipment.deviceId}, Category ID: {equipment.categoryId})
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Button
                                        variant="outline"
                                        className="mr-2"
                                        onClick={() => {
                                          setEditingEquipment({
                                            ...equipment,
                                            roomId: room.roomId,
                                          });
                                          setEquipmentDialogOpen(true);
                                        }}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        className="mr-2"
                                        onClick={() =>
                                          handleDeleteEquipment(
                                            equipment.equipmentId
                                          )
                                        }
                                      >
                                        Delete
                                      </Button>
                                      <Button
                                        variant={
                                          equipmentStates[equipment.equipmentId]
                                            ? "default"
                                            : "secondary"
                                        }
                                        onClick={() =>
                                          handleEquipmentControl(
                                            equipment.equipmentId,
                                            equipmentStates[equipment.equipmentId]
                                              ? 1
                                              : 0
                                          )
                                        }
                                      >
                                        {equipmentStates[equipment.equipmentId]
                                          ? "On"
                                          : "Off"}
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

      <BlockDialog
        open={blockDialogOpen}
        onOpenChange={setBlockDialogOpen}
        isEdit={!!editingBlock}
        initialData={editingBlock}
        onSubmit={async (data) => {
          const success = editingBlock
            ? await handleUpdateBlock(editingBlock.blockId, data)
            : await handleAddBlock(data);
          if (success) {
            setBlockDialogOpen(false);
          }
        }}
      />

      <FloorDialog
        open={floorDialogOpen}
        onOpenChange={setFloorDialogOpen}
        isEdit={!!editingFloor}
        initialData={editingFloor}
        blockId={selectedBlockId}
        onSubmit={async (data) => {
          const success = editingFloor
            ? await handleUpdateFloor(editingFloor.floorId, data)
            : await handleAddFloor(data);
          if (success) {
            setFloorDialogOpen(false);
            // Expand the block to show the new floor
            if (!editingFloor) {
              setExpandedBlocks((prev) => ({ ...prev, [selectedBlockId!]: true }));
            }
          }
        }}
      />

      <RoomDialog
        open={roomDialogOpen}
        onOpenChange={setRoomDialogOpen}
        isEdit={!!editingRoom}
        initialData={editingRoom}
        floorId={selectedFloorId}
        onSubmit={handleRoomDialogSubmit}
      />

      <EquipmentDialog
        open={equipmentDialogOpen}
        onOpenChange={setEquipmentDialogOpen}
        isEdit={!!editingEquipment}
        initialData={editingEquipment}
        roomId={selectedRoomId}
        onSubmit={async (data) => {
          const success = editingEquipment
            ? await handleUpdateEquipment(editingEquipment.equipmentId, data)
            : await handleAddEquipment(data);
          if (success) {
            setEquipmentDialogOpen(false);
          }
        }}
      />
    </div>
  );
}
