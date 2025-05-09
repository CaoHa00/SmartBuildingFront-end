"use client";

import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { AppSidebar } from "../../../../_components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import DashboardNavigation from "@/components/dashboard-nav";
import FloorOverview from "./_components/FloorOverview";

export function FloorPage() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();

  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
      />
      <SidebarInset className="bg-neutral-100 dark:bg-blue-950 flex flex-col h-screen">
        <Header title={selectedFacility} />
        <div className="bg-background p-5">
          <div className="space-y-4">
            <DashboardNavigation />
          </div>
          <FloorOverview />
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <FacilityProvider>
      <FloorPage />
    </FacilityProvider>
  );
}
