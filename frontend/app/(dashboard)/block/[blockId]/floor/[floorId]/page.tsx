"use client";
import { useEffect, useState } from "react";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { AppSidebar } from "../../../../_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { RoomCard } from "./_components/roomCard";

export function FloorIdPage() {
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();
  const [rooms, setRooms] = useState<
    Array<{
      roomName: string;
      status: "available" | "occupied";
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to chunk arrays into groups
  const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  useEffect(() => {
    const generatedRooms = Array.from({ length: 23 }, (_, i) => ({
      roomName: `Room ${101 + i}`,
      status: ["available", "occupied"][Math.floor(Math.random() * 2)] as
        | "available"
        | "occupied",
    }));

    const sortedRooms = generatedRooms.sort((a, b) => {
      const aNum = parseInt(a.roomName.replace(/\D/g, "")) || 0;
      const bNum = parseInt(b.roomName.replace(/\D/g, "")) || 0;
      return aNum - bNum;
    });
    setRooms(sortedRooms);
    setIsLoading(false);
  }, []);

  // Filter even and odd rooms
  const evenRooms = rooms.filter(
    (room) => parseInt(room.roomName.replace(/\D/g, "")) % 2 === 0
  );
  const oddRooms = rooms.filter(
    (room) => parseInt(room.roomName.replace(/\D/g, "")) % 2 !== 0
  );

  // Chunk rooms into rows of 5
  const evenRows = chunkArray(evenRooms, 8);
  const oddRows = chunkArray(oddRooms, 8);

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
          {isLoading ? (
            <div className="text-center py-4">Loading rooms...</div>
          ) : (
            <div className="space-y-8">
              <h1 className="text-base font-bold text-blue-800">Left Side</h1>
              {/* Even numbered rooms */}
              <div className="space-y-4">
                {evenRows.map((row, rowIndex) => (
                  <div
                    key={`even-row-${rowIndex}`}
                    className="flex gap-4 justify-start"
                  >
                    {row.map((room, index) => (
                      <div key={`even-${rowIndex}-${index}`} className="w-full">
                        <RoomCard
                          roomName={room.roomName}
                          status={room.status}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Odd numbered rooms */}
              <div className="space-y-4">
                <h1 className="text-base font-bold text-blue-800">Right Side</h1>
                {oddRows.map((row, rowIndex) => (
                  <div
                    key={`odd-row-${rowIndex}`}
                    className="flex gap-4 justify-start"
                  >
                    {row.map((room, index) => (
                      <div key={`odd-${rowIndex}-${index}`} className="w-full">
                        <RoomCard
                          roomName={room.roomName}
                          status={room.status}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <FacilityProvider>
      <FloorIdPage />
    </FacilityProvider>
  );
}
