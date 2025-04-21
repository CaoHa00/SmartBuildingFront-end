"use client";
import { AppSidebar } from "../../../../../../_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { EnergyChart } from "./_components/energy-chart";
import ActiveDevice from "./_components/active-device";
import DeviceManager from "./_components/device-manager";
import { AirConditionerControl } from "./_components/ac-control";
import { AirMonitor } from "./_components/air-monitor";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { ElectricityCard } from "./_components/electricity-card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { PageHeader } from "../../../../../../_components/page-header";
import HumidTempChart from "@/components/HumidTempChart";

function RoomIdPage() {
  const isMobile = useIsMobile();
  const params = useParams();
  const { selectedFacility, setSelectedFacility } = useFacility();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/room/${params.roomId}`);
        setSelectedFacility(response.data.roomName);
      } catch (error) {
        console.error("Failed to fetch room details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomDetails();
  }, [params.roomId, setSelectedFacility]);

  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
      />
      <SidebarInset className="bg-sky-300">
        <PageHeader title={selectedFacility} />
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 pt-0">
          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-3">
            <AirMonitor />
            <div className="col-1 flex-1 aspect-auto rounded-xl bg-muted/50 md:min-h-min bg-sky-300 shadow-xl">
              <ElectricityCard />
            </div>
            <EnergyChart/>
            {/* <HumidTempChart /> */}
            <div className="aspect-video h-full w-full relative rounded-xl bg-blue-200">
              <ActiveDevice />
            </div>
            <DeviceManager />
            <div className="row-span-1 h-full grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-4">
              <AirConditionerControl />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <FacilityProvider>
      <RoomIdPage />
    </FacilityProvider>
  );
}
