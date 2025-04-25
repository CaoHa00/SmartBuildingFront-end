"use client";
import { AppSidebar } from "../../../../../../_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { EnergyChart } from "./_components/energy-chart";
import ActiveDevice from "./_components/active-device";
import DeviceManager from "./_components/device-manager";
import { AirConditionerControl } from "./_components/ac-control";
import { AirMonitor } from "./_components/air-monitor";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { ElectricityCard } from "./_components/electricity-card";
import { ElectricityAreaChart } from "./_components/electricity-area-chart";

function RoomIdPage() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();

  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
      />
      <SidebarInset className="bg-neutral-100 dark:bg-blue-950">
        <header
          className={`flex ${
            isMobile ? "h-12" : "h-16"
          } shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 font-bold text-xl text-blue-800`}
        >
          <div className="flex items-center gap-2 px-2 md:px-4 dark:text-neutral-100">
            <SidebarTrigger className="-ml-1 w-5 h-5" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className={`${isMobile ? "text-lg" : "text-xl"} font-bold`}>
              {selectedFacility}
            </h1>
            {/* <SearchBar/> */}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 pt-0">
          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-3">
            <AirMonitor />
            <div className="col-1 flex-1 aspect-auto rounded-xl bg-muted/50 md:min-h-min bg-neutral-100 shadow-xl">
              <ElectricityCard />
            </div>

            <ElectricityAreaChart />
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
