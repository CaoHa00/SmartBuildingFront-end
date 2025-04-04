"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BuildingModel2D } from "./_components/BuildingModel2D";
import { CO2EmissionChart } from "./_components/CO2EmissionChart";
import {
  AlertCircle,
  CloudFog,
  Cpu,
  LucideIcon,
  Thermometer,
  UserRoundCheck,
  Zap,
} from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatCardProps {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
}

function StatCard({ title, value, icon, note }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="text-2xl">{React.createElement(icon)}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <span className="text-xs">{note}</span>
      </CardFooter>
    </Card>
  );
}

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Tabs defaultValue="bulding-summary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bulding-summary">Builiding Summary</TabsTrigger>
            <TabsTrigger value="bms">BMS Overview</TabsTrigger>
            <TabsTrigger value="metering">Metering</TabsTrigger>
            <TabsTrigger value="lighting">Lighting</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="equipment">Sercurity</TabsTrigger>
          </TabsList>

          <TabsContent value="bulding-summary"></TabsContent>

          <TabsContent value="bms"></TabsContent>

          <TabsContent value="metering"></TabsContent>

          <TabsContent value="ligting"></TabsContent>
        </Tabs>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Building Overview</CardTitle>
            <BuildingModel2D />
          </CardHeader>
          <CardContent></CardContent>
        </Card>

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
            <CardTitle>Temperature Zones</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
