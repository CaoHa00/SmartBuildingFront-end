"use client";
import { AppSidebar } from "../../../../../../_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ActiveDevice from "./_components/active-device";
import { AirMonitor } from "./_components/air-monitor";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import DashboardNavigation from "@/components/dashboard-nav";
import { ElectricityCard } from "./_components/electricity-card";
import { StudentChart } from "./_components/student-chart";
import AcCard from "./_components/ac-card";
import Co2Emission from "./_components/co2-emission";
import RoomInfo from "./_components/roomInformation";

function RoomIdPage() {
  const { selectedFacility } = useFacility();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-neutral-100 dark:bg-blue-950">
        <Header title={selectedFacility} />

        {/* Duc: Put content inside a background div, changed content height */}

        <div className="bg-background p-5">
          <div className="space-y-4">
            <DashboardNavigation />
          </div>
          {/* Main content area with single scroll container */}
          <div className="flex flex-col gap-4 p-4 h-[calc(100vh-8rem)] overflow-y-auto">
            {/* Monitoring Dashboard Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Primary Metrics */}
              <div className="rounded-xl bg-white dark:bg-slate-800 shadow-lg p-4 hover:shadow-xl transition-shadow">
                <ElectricityCard />
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-800 shadow-lg p-4 hover:shadow-xl transition-shadow">
                <AirMonitor />
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-800 shadow-lg p-4 hover:shadow-xl transition-shadow">
                <Co2Emission />
              </div>

              {/* Secondary Metrics */}
              <div className="rounded-xl bg-white dark:bg-slate-800 shadow-lg p-4 hover:shadow-xl transition-shadow">
                <StudentChart />
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-800 shadow-lg p-4 hover:shadow-xl transition-shadow">
                <AcCard />
              </div>

              <div className="rounded-xl bg-white dark:bg-slate-800 shadow-lg p-4 hover:shadow-xl transition-shadow">
                <ActiveDevice />
              </div>
            </section>
            {/* Room Information Section - Moved to bottom */}
            <section className="w-full rounded-xl bg-white dark:bg-slate-800 shadow-lg p-4">
              <RoomInfo />
            </section>
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
