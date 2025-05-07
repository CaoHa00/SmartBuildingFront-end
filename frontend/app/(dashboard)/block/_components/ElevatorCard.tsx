"use client";
import { Elevator } from "@/components/ui/elevator";
import { Building2 } from "lucide-react";
import { useState } from "react";

export default function ElevatorCard() {
  const [elevator] = useState({
    id: "A",
    status: "moving" as const,
    phaseConsumption: {
      phase1: 2.8,
      phase2: 2.6,
      phase3: 2.7,
    },
    totalConsumption: 45.0,
  });
  return (
    <div className="rounded-xl border-2 bg-card text-card-foreground shadow dark:border-primary p-5">
      <h2 className="text-xl font-bold text-card-foreground mb-1">
        <div className="flex justify-between">
          <span>ELEVATOR STATUS</span>
          <div className="pt-1">
            <Building2 size={24} />
          </div>
        </div>
      </h2>
      <div className="mb-4 text-muted-foreground text-sm">BLOCK 8</div>
      <div>
        <Elevator
          id={elevator.id}
          status={elevator.status}
          phaseConsumption={elevator.phaseConsumption}
          totalConsumption={elevator.totalConsumption}
        />
      </div>
    </div>
  );
}
