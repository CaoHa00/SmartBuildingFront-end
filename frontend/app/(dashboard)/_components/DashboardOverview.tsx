"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BlockModel3D } from "../block/[blockId]/_components/Block3DModel";
import OverviewElectricalCard from "./OverviewElectricalCard";
import OverviewWaterConsumptionCard from "./OverviewWaterConsumptionCard";
import OverviewCo2EmissionCard from "./OverviewCo2EmissionCard";
import GreenIndexCard from "./GreenIndexCard";
import ReusableEnergyCard from "./ReusableEnergyCard";
import OverviewCo2ReductionCard from "./OverviewCo2ReductionCard";
import Co2Comparison from "./Co2Comparison";

export default function DashboardOverview() {
  return (
    <div className="flex-1 space-y-4 max-h-screen">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="grid gap-4">
          <OverviewElectricalCard />
        </div>
        <div className="grid col-span-2 gap-4 md:row-span-2">
          <Card className="bg-card">
            <CardContent className="p-4">
              <BlockModel3D />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4">
          <ReusableEnergyCard />
        </div>
        <div className="grid gap-4">
          <OverviewWaterConsumptionCard />
        </div>
        <div className="grid gap-4">
          <GreenIndexCard />
        </div>
        <div className="grid gap-4">
          <OverviewCo2EmissionCard />
        </div>
        <div className="grid gap-4 col-span-2">
          <Co2Comparison />
        </div>
        <div className="grid gap-4">
          <OverviewCo2ReductionCard />
        </div>
      </div>
    </div>
  );
}
