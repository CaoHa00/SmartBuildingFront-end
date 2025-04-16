"use client";
import { AppSidebar } from "./(dashboard)/_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CampusMap } from "./(dashboard)/_components/campus-map";
import { CampusStats } from "./(dashboard)/_components/campus-stats";
import { BuildingList } from "./(dashboard)/_components/building-list";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider } from "@/app/context/facility-context";

function DashboardContent() {
  const isMobile = useIsMobile();

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
              EIU Overview
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 pt-0">
          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 aspect-[16/9] rounded-xl bg-muted/50">
              <CampusMap />
            </div>
            <div className="flex flex-col gap-2 md:gap-4">
              <CampusStats />
              <BuildingList />
            </div>
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
              {/* <BuildingOverview />
              <EnergyChart />
              <ElectricityCard /> */}
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
      <DashboardContent />
    </FacilityProvider>
  );
}
