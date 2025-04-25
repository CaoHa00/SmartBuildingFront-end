"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BuildingModel3D } from "./BuildingModel3D";
import { CO2EmissionChart } from "./CO2EmissionChart";
import {
  AlertCircle,
  CloudFog,
  Cpu,
  LucideIcon,
  Thermometer,
  UserRoundCheck,
  Zap,
} from "lucide-react";
import WeatherForecast from "./WeatherForecast";
import useCurrentElectricalReading from "@/hooks/use-current-electrical-reading";

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  note: string;
  icon: LucideIcon;
  iconColor: string;
}

export default function BuildingSummary() {
  const currentBuildingElectricalReading = useCurrentElectricalReading();
  return (
    <div className="flex-1 space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="grid row-span-2 sm:grid-cols-1 gap-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-xl card-foreground">
                Building Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BuildingModel3D />
            </CardContent>
          </Card>
        </div>
        <StatCard
          title=" Current Average Temperature"
          value={22}
          unit="°C"
          icon={Thermometer}
          note=""
          iconColor="#de2612"
        />
        <StatCard
          title="Equipment"
          value={98}
          unit="%"
          icon={Cpu}
          note="Equipment Running Today"
          iconColor="#0aced1"
        />
        <div className="grid row-span-2 sm:grid-cols-1 gap-4">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground">
                Weather Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <WeatherForecast />
            </CardContent>
          </Card>
        </div>
        <StatCard
          title="Current Energy Usage"
          value={
            Math.round(
              (currentBuildingElectricalReading
                ? currentBuildingElectricalReading.electricalReading
                : 0) * 100
            ) / 100
          }
          unit="kW"
          icon={Zap}
          note=""
          iconColor="#e0b61d"
        />
        <StatCard
          title="Current CO₂ Emission"
          value={539}
          unit="ppm"
          icon={CloudFog}
          note=""
          iconColor="#1ba80c"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Daily Energy Consumption and Carbon Emisssions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CO2EmissionChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Temperature Zones</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Scheduler</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  unit,
  icon,
  note,
  iconColor,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-2xl">
          {React.createElement(icon, { color: iconColor })}
        </span>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-2xl font-bold text-accent-foreground">
          <span>{value}</span>
          <span> {unit}</span>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-card-foreground">
        <span className="text-xs">{note}</span>
      </CardFooter>
    </Card>
  );
}
