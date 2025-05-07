"use client";

import React, { useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../_components/app-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { useGreeting } from "@/hooks/use-greeting";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlockOverview from "../_components/BlockOverview";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export function BlockPage() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();
  const params = useParams();
  const blockId = params.blockId as string;
  const [floors] = useState([
    {
      name: "Floor 1",
      occupancy: 25,
      temperature: 24,
      humidity: 65,
      totalRooms: 12,
      activeRooms: 8,
    },
    {
      name: "Floor 2",
      occupancy: 18,
      temperature: 23,
      humidity: 62,
      totalRooms: 10,
      activeRooms: 7,
    },
    {
      name: "Floor 3",
      occupancy: 32,
      temperature: 25,
      humidity: 68,
      totalRooms: 15,
      activeRooms: 12,
    },
    {
      name: "Floor 4",
      occupancy: 15,
      temperature: 22,
      humidity: 60,
      totalRooms: 8,
      activeRooms: 5,
    },
  ]);
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

  const stats = {
    electricity: { value: "2,400 kWh", highestFloor: "Floor 3" },
    co2: { value: "1,200 kg", highestFloor: "Floor 2" },
    water: { value: "5,000 L", highestFloor: "Floor 4" },
    rooms: {
      total: floors.reduce((acc, f) => acc + f.totalRooms, 0),
      active: floors.reduce((acc, f) => acc + f.activeRooms, 0),
    },
  };

  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
      />
      <SidebarInset className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-blue-950 dark:to-slate-900 flex flex-col h-screen overflow-hidden">
        <Header title={selectedFacility} />

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Active Rooms
              </h3>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats.rooms.active}/{stats.rooms.total}
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Currently in use
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/50">
                <svg
                  className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Highest Electricity Usage
              </h3>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats.electricity.value}
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stats.electricity.highestFloor}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50">
                <svg
                  className="w-4 h-4 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h8M8 14h8M8 18h8M8 6h8M5 6h.01M5 10h.01M5 14h.01M5 18h.01M21 12c0 4.418-3.582 8-8 8H9.414l-4.707 4.707A1 1 0 014 22V2a1 1 0 011.707-.707L9.414 6H13c4.418 0 8 3.582 8 8z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Highest CO2 Emissions
              </h3>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats.co2.value}
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stats.co2.highestFloor}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-5 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.02] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/50">
                <svg
                  className="w-4 h-4 text-sky-600 dark:text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18M3 18h18M3 6h18M5 6h.01M5 10h.01M5 14h.01M5 18h.01M21 12c0 4.418-3.582 8-8 8H9.414l-4.707 4.707A1 1 0 014 22V2a1 1 0 011.707-.707L9.414 6H13c4.418 0 8 3.582 8 8z"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Highest Water Usage
              </h3>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {stats.water.value}
              </span>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {stats.water.highestFloor}
              </p>
            </div>
          </div>
        </div> */}

        {/* <div className="flex gap-4 p-4 h-[calc(100vh-16rem)]">
          <div className="flex-1 bg-white/90 rounded-xl p-4">
            <div className="relative w-full h-full">
              <img
                src="/img/IIC.png"
                alt="Building Plan"
                className="absolute inset-0 w-full h-full object-contain p-4"
              />
            </div>
          </div>

          <div className="w-96 flex flex-col gap-4">
            <div className="bg-white/90 rounded-xl p-4">
              <h2 className="text-base font-bold text-blue-800 mb-4">
                Elevator Status
              </h2>
              <div>
                <Elevator
                  id={elevator.id}
                  status={elevator.status}
                  phaseConsumption={elevator.phaseConsumption}
                  totalConsumption={elevator.totalConsumption}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {floors.map((floor) => (
                  <FloorCard
                    key={floor.name}
                    floorName={floor.name}
                    occupancy={floor.occupancy}
                    temperature={floor.temperature}
                    humidity={floor.humidity}
                    totalRooms={floor.totalRooms}
                    activeRooms={floor.activeRooms}
                  />
                ))}
              </div>
            </div>
          </div>
        </div> */}
        <div className="bg-background p-5">
          <div className="space-y-4">
            <Tabs defaultValue="overview" className="space-y-4">
              <div className="flex justify-between">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/"
                        className="text-white font-bold text-2xl"
                      >
                        DASHBOARD
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href="/testDash"
                        className="text-white font-bold text-2xl"
                      >
                        Block 8
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  <TabsTrigger value="material">Material</TabsTrigger>
                  <TabsTrigger value="control">Control</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="overview">
                <BlockOverview />
              </TabsContent>
              <TabsContent value="equipment">
                {/* Equipment Component */}
              </TabsContent>
              <TabsContent value="material">
                {/* Material Component */}
              </TabsContent>
              <TabsContent value="control">
                {/* Control Component */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <FacilityProvider>
      <BlockPage />
    </FacilityProvider>
  );
}
