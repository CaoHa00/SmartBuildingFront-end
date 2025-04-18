"use client";
import { AppSidebar } from "./(dashboard)/_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CampusMap } from "./(dashboard)/_components/campus-map";
import { CampusStats } from "./(dashboard)/_components/campus-stats";
import { BuildingList } from "./(dashboard)/_components/building-list";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider } from "@/app/context/facility-context";
import { PageHeader } from "./(dashboard)/_components/page-header";

function DashboardContent() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
      />
      <SidebarInset className="bg-blue-800">
        <PageHeader title="EIU Overview" />
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
