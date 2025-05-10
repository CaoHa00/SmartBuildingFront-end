"use client";

import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./(dashboard)/_components/app-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import DashboardOverview from "./(dashboard)/_components/DashboardOverview";

export function MainDashboard() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();
  return (
    <SidebarProvider>
      <AppSidebar
        className={`${isMobile ? "p-1 rounded-xl" : "rounded-3xl"}`}
      />
      <SidebarInset className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-blue-950 dark:to-slate-900 flex flex-col h-screen overflow-hidden">
        <Header title={selectedFacility} />
        <div className="bg-background p-5 pb-7">
          <div className="space-y-4 mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-white text-base leading-8"
                  >
                    DASHBOARD
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DashboardOverview />
        </div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <FacilityProvider>
      <MainDashboard />
    </FacilityProvider>
  );
}
