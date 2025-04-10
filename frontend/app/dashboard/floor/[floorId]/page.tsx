"use client";
import { useEffect, useState } from "react";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { AppSidebar } from "@/app/dashboard/_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { RoomCard } from "./_components/roomCard";

function DashboardContent() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();
  const [rooms, setRooms] = useState<Array<{ roomName: string; status: "available" | "occupied" | "maintenance" }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate rooms data on client side
    const generatedRooms = Array.from({ length: 23 }, (_, i) => ({
      roomName: `Room ${i + 1}`,
      status: ["available", "occupied", "maintenance"][Math.floor(Math.random() * 3)] as "available" | "occupied" | "maintenance"
    }));
    setRooms(generatedRooms);
    setIsLoading(false);
  }, []);

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
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 pt-0">
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {isLoading ? (
              <div className="col-span-full text-center py-4">Loading rooms...</div>
            ) : (
              rooms.map((room, index) => (
                <RoomCard
                  key={index}
                  roomName={room.roomName}
                  status={room.status}
                />
              ))
            )}
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
