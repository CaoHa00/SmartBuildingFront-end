"use client";
import { AppSidebar } from "../../../../../../../_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ActiveDevice from "./_components/active-device-control";
import { AirConditionerControl } from "./_components/ac-control";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import DashboardNavigation from "@/components/dashboard-nav";
import TvControl from "./_components/tv-control";
import { ElectricControl } from "./_components/electric-control";

export function RoomControlPage() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();

  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
      />
      <SidebarInset className="bg-neutral-100 dark:bg-blue-950">
        <Header title={selectedFacility} />
        <div className="bg-background p-5">
          <div className="space-y-4">
            <DashboardNavigation />
          </div>
          <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 h-[855px] overflow-y-auto">
            <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-2">
              <ActiveDevice />
              <div className="col-1 flex-1 aspect-auto rounded-xl bg-muted/50 md:min-h-min bg-neutral-100 shadow-xl">
                <ElectricControl />
              </div>
              <TvControl />
              <div className="row-span-1 h-full grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-4">
                <AirConditionerControl />
              </div>
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
      <RoomControlPage />
    </FacilityProvider>
  );
}
