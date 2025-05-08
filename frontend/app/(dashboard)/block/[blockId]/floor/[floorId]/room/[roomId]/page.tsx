"use client";
import { AppSidebar } from "../../../../../../_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ActiveDevice from "./_components/active-device";
import { AirMonitor } from "./_components/air-monitor";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import DashboardNavigation from "@/components/dashboard-nav";
import { ElectricityCard } from "./_components/electricity-card";
import { StudentChart } from "./_components/student-chart";
import AcCard from "./_components/ac-card";
import Co2Emission from "./_components/co2-emission";

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
        <DashboardNavigation />
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="grid gap-2 md:gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 auto-rows-fr min-h-0">
            <div className="w-full h-full">
              <ElectricityCard />
            </div>

            <div className="w-full h-full rounded-xl bg-muted/50 bg-neutral-100 shadow-xl">
              <AirMonitor />
            </div>

            <div className="w-full h-full">
              <StudentChart />
            </div>

            <div className="w-full h-full rounded-xl bg-blue-200">
              <Co2Emission/>
            </div>

            <div className="w-full h-full">
              <AcCard />
            </div>

            <div className="w-full h-full">
              <ActiveDevice />
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
