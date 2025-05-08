"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BlockModel3D } from "./Block3DModel";
import ElectricalReadingCard from "./ElectricalReadingCard";
import ExpectedOccupantsCard from "./ExpectedOccupantsCard";
import CO2EmissionCard from "./Co2EmissionCard";
import RoomsInUseCard from "./RoomsInUseCard";
import DrinkingWaterCard from "./DrinkingWaterCard";
import ElevatorCard from "./ElevatorCard";

export default function BlockOverview() {
  return (
    <div className="flex-1 space-y-4 max-h-screen">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="grid gap-4 md:row-span-2 lg:row-span-3">
          <ElectricalReadingCard />
        </div>
        <div className="grid col-span-2 gap-4 md:row-span-2 lg:row-span-3">
          <Card className="bg-card">
            <CardContent className="p-4">
              <BlockModel3D />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:row-span-2 lg:row-span-3">
          <ElevatorCard />
        </div>
        <div className="grid gap-4 md:row-span-2 lg:row-span-3">
          <CO2EmissionCard />
        </div>
        <div className="grid gap-4 md:row-span-2 lg:row-span-3">
          <DrinkingWaterCard />
        </div>
        <div className="grid gap-4 md:row-span-2 lg:row-span-3">
          <ExpectedOccupantsCard />
        </div>
        <div className="grid gap-4 md:row-span-2 lg:row-span-3">
          <RoomsInUseCard />
        </div>
      </div>
    </div>
  );
}
