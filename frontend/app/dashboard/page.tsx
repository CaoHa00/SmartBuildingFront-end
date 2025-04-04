"use client";
import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CirclePlus } from "lucide-react";

import { EnergyChart } from "./_components/energy-chart";
import ActiveDevice from "./_components/active-device";
import DeviceManager from "./_components/device-manager";
import WifiTab from "./_components/wifi-tab";
import BluetoothTab from "./_components/bluetooth-tab";
import AddNewDevice from "./_components/add-new-device";
import { SiriWave } from "./_components/siri-wave";
import { AirConditionerControl } from "./_components/ac-control";
import { AirMonitor } from "./_components/air-monitor";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { ElectricityCard } from "./_components/electricity-card";

function DashboardContent() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();

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
            {/* <SearchBar/> */}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 pt-0">
          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-3">
            <AirMonitor />
            <div className="col-1 flex-1 aspect-auto rounded-xl bg-muted/50 md:min-h-min bg-sky-300 shadow-xl">
              <ElectricityCard />
            </div>

            <EnergyChart />
            <div className="aspect-video h-full w-full relative rounded-xl bg-blue-200">
              <ActiveDevice />
            </div>
            <DeviceManager />
            <div className="row-span-1 h-full grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-4">
              <AirConditionerControl />

              {/* <WifiTab />
              <BluetoothTab /> */}
              {/* <div className="col-span-1 md:col-span-2 aspect-[8/3] rounded-xl bg-blue-700 overflow-hidden relative group">
                <div className="flex justify-between text-white">
                  <div className="ml-3 md:ml-5 pt-2 md:pt-3">
                    <h2 className="font-bold tracking-wide text-sm md:text-base text-white leading-none">
                      VOICE ASSISTANT
                    </h2>
                    <p className="tracking-widest text-sky-100 text-[8px] md:text-[10px] font-thin">
                      VOICE CONTROL THE SMART BUILDING
                    </p>
                  </div>
                  <CirclePlus
                    size={isMobile ? 16 : 20}
                    className="m-2 md:m-3"
                  />
                </div>
                <div className="h-8 md:h-12 mx-4">
                  <SiriWave />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-base md:text-xl font-medium">
                    How can I help you?
                  </span>
                </div>
              </div> */}
            </div>
            {/* <AddNewDevice /> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <FacilityProvider>
      <DashboardContent />
    </FacilityProvider>
  );
}
