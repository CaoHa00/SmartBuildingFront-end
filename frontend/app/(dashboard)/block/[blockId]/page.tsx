"use client";
import React, { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../../_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { FloorCard } from "../../_components/floor-card";

export const BlockIdPage = () => {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();
  const [floors] = useState([
    { name: 'Floor 1', occupancy: 25, temperature: 24, humidity: 65, totalRooms: 12, activeRooms: 8 },
    { name: 'Floor 2', occupancy: 18, temperature: 23, humidity: 62, totalRooms: 10, activeRooms: 7 },
    { name: 'Floor 3', occupancy: 32, temperature: 25, humidity: 68, totalRooms: 15, activeRooms: 12 },
    { name: 'Floor 4', occupancy: 15, temperature: 22, humidity: 60, totalRooms: 8, activeRooms: 5 },
  ]);

  const stats = {
    electricity: { value: '2,400 kWh', highestFloor: 'Floor 3' },
    co2: { value: '1,200 kg', highestFloor: 'Floor 2' },
    water: { value: '5,000 L', highestFloor: 'Floor 4' },
    rooms: { total: floors.reduce((acc, f) => acc + f.totalRooms, 0), 
             active: floors.reduce((acc, f) => acc + f.activeRooms, 0) }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
      />
      <SidebarInset className="bg-sky-300">
        <header
          className={`flex ${
            isMobile ? "h-12" : "h-16"
          } shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 font-bold text-xl text-blue-800`}
        >
          <div className="flex items-center gap-2 px-2 md:px-4">
            <SidebarTrigger className="-ml-1 w-5 h-5" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className={`${isMobile ? "text-lg" : "text-xl"} font-bold`}>
              {selectedFacility}
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="bg-white/90 p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Active Rooms</h3>
            <div className="mt-2">
              <span className="text-2xl font-bold text-blue-800">{stats.rooms.active}/{stats.rooms.total}</span>
              <p className="text-sm text-gray-600 mt-1">Rooms in use</p>
            </div>
          </div>
          
          <div className="bg-white/90 p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Highest Electricity Usage</h3>
            <div className="mt-2">
              <span className="text-2xl font-bold text-blue-800">{stats.electricity.value}</span>
              <p className="text-sm text-gray-600 mt-1">Highest in {stats.electricity.highestFloor}</p>
            </div>
          </div>
          
          <div className="bg-white/90 p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Highest CO2 Emissions</h3>
            <div className="mt-2">
              <span className="text-2xl font-bold text-blue-800">{stats.co2.value}</span>
              <p className="text-sm text-gray-600 mt-1">Highest in {stats.co2.highestFloor}</p>
            </div>
          </div>
          
          <div className="bg-white/90 p-4 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Highest Water Usage</h3>
            <div className="mt-2">
              <span className="text-2xl font-bold text-blue-800">{stats.water.value}</span>
              <p className="text-sm text-gray-600 mt-1">Highest in {stats.water.highestFloor}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 p-4 h-[calc(100vh-16rem)]">
          {/* Building Image */}
          <div className="flex-1 bg-white/90 rounded-xl p-4 flex items-center justify-center">
            <img 
              src="/img/IIC.png" 
              alt="Building Plan" 
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Floor Cards */}
          <div className="w-96 overflow-y-auto">
            <div className="flex flex-col gap-4">
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
      </SidebarInset>
    </SidebarProvider>
  );
};

export default function Page() {
  return (
    <FacilityProvider>
      <BlockIdPage />
    </FacilityProvider>
  );
}
