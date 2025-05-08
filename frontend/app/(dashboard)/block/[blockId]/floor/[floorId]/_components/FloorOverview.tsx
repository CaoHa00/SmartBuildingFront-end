"use client";

import TotalRoom from "./TotalRoom";
import RoomInUse from "./RoomInUse";
import EquipmentStatus from "./EquipmentStatus";

export default function FloorOverview() {
  return (
    <div className="flex-1 space-y-4 max-h-screen">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-4">
          <TotalRoom />
        </div>
        <div className="grid gap-4">
          <RoomInUse />
        </div>
        <div className="grid gap-4 col-span-2">
          <EquipmentStatus />
        </div>
      </div>
    </div>
  );
}
