"use client";

import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../_components/app-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import DashboardNavigation from "../../../../components/dashboard-nav";
import BlockOverview from "./_components/BlockOverview";

export function BlockPage() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();

  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
      />
      <SidebarInset className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-blue-950 dark:to-slate-900 flex flex-col h-screen overflow-hidden">
        <Header title={selectedFacility} />
        <div className="bg-background p-5">
          <div className="space-y-4">
            <DashboardNavigation />
          </div>
          <BlockOverview />
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <FacilityProvider>
      <BlockPage />
    </FacilityProvider>
  );
}
