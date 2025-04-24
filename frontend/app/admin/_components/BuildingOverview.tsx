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

interface StatCardProps {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
}

export default function BuildingSummary() {
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
          title="Average Temperature"
          value="22°C"
          icon={Thermometer}
          note="Avarage Daily Usage"
        />
        <StatCard
          title="Occupancy"
          value="342"
          icon={UserRoundCheck}
          note="Current Occupancy"
        />
        <div className="grid row-span-3 sm:grid-cols-1 gap-4">
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
        <StatCard title="Energy Usage" value="4.2 kWh" icon={Zap} note="" />
        <StatCard
          title="CO2"
          value="539 ppm"
          icon={CloudFog}
          note="Max C02 Level/ Building"
        />
        <StatCard
          title="Equipment"
          value="98%"
          icon={Cpu}
          note="Equipment Running Today"
        />
        <StatCard title="Active Alerts" value="2" icon={AlertCircle} note="" />
        <StatCard title="Active Alerts" value="2" icon={AlertCircle} note="" />
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

function StatCard({ title, value, icon, note }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-2xl">{React.createElement(icon)}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-accent-foreground">{value}</div>
      </CardContent>
      <CardFooter className="text-sm text-card-foreground">
        <span className="text-xs">{note}</span>
      </CardFooter>
    </Card>
  );
}
