"use client";
import { AppSidebar } from "../../../../../../_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import ActiveDevice from "./_components/active-device";
import DeviceManager from "./_components/device-manager";
import { AirConditionerControl } from "./_components/ac-control";
import { AirMonitor } from "./_components/air-monitor";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { ElectricityCard } from "./_components/electricity-card";
import { ElectricityAreaChart } from "./_components/electricity-area-chart";
import { useGreeting } from "@/hooks/use-greeting";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

function RoomIdPage() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();

  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
      />
      <SidebarInset className="bg-neutral-100 dark:bg-blue-950">
        <Header title={selectedFacility} />
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 h-[calc(100vh-8rem)] overflow-y-auto">
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
        <Footer />
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
