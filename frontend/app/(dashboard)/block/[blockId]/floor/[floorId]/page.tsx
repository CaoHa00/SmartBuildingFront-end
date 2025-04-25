"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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

interface Room {
  roomName: string;
  status: "available" | "occupied";
  temperature: number;
  humidity: number;
  devices: {
    ac: boolean;
    light: boolean;
    tv: boolean;
  };
}

export function FloorIdPage() {
  const router = useRouter();
  const params = useParams();
  const isMobile = useIsMobile();
  const { selectedFacility } = useFacility();
  const [rooms, setRooms] = useState<Array<Room>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to chunk arrays into groups
  const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const generateRooms = () => {
    const generatedRooms: Room[] = Array.from({ length: 16 }, (_, i) => {
      const isOccupied = Math.random() < 0.5;
      return {
        roomName: `Room ${101 + i}`,
        status: isOccupied ? "occupied" : "available",
        temperature: Math.floor(Math.random() * (30 - 18 + 1)) + 18,
        humidity: Math.floor(Math.random() * (75 - 30 + 1)) + 30,
        devices: {
          ac: isOccupied,
          light: isOccupied,
          tv: isOccupied && Math.random() < 0.5,
        },
      };
    });

    return generatedRooms.sort((a, b) => {
      const aNum = parseInt(a.roomName.replace(/\D/g, "")) || 0;
      const bNum = parseInt(b.roomName.replace(/\D/g, "")) || 0;
      return aNum - bNum;
    });
  };

  useEffect(() => {
    // Only generate rooms on the client side
    setRooms(generateRooms());
    setIsLoading(false);
  }, []);

  const handleRoomClick = (roomName: string) => {
    const roomNumber = roomName.replace(/\D/g, "");
    router.push(
      `/block/${params.blockId}/floor/${params.floorId}/room/${roomNumber}`
    );
  };

  // Show loading state during initial render
  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar
          className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
        />
        <SidebarInset className="bg-neutral-100 dark:bg-blue-950 flex flex-col h-screen overflow-hidden">
          <div className="text-center py-4">Loading rooms...</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

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
      <SidebarInset className="bg-neutral-100 dark:bg-blue-950 flex flex-col h-screen overflow-hidden">
        <header
          className={`flex ${
            isMobile ? "h-12" : "h-16"
          } shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 font-bold text-xl text-blue-800`}
        >
          <div className="flex items-center gap-2 px-2 md:px-4 dark:text-neutral-100">
            <SidebarTrigger className="-ml-1 w-5 h-5" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className={`${isMobile ? "text-lg" : "text-xl"} font-bold`}>
              {selectedFacility}
            </h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 pt-0">
          <div className="space-y-8">
            <h1 className="text-base font-bold text-blue-800 dark:text-neutral-100">
              Left Side
            </h1>
            {/* Even numbered rooms */}
            <div className="space-y-4">
              {evenRows.map((row, rowIndex) => (
                <div
                  key={`even-row-${rowIndex}`}
                  className="flex gap-4 justify-start"
                >
                  {row.map((room, index) => (
                    <div
                      key={`even-${rowIndex}-${index}`}
                      className="w-full cursor-pointer"
                      onClick={() => handleRoomClick(room.roomName)}
                    >
                      <RoomCard
                        roomName={room.roomName}
                        status={room.status}
                        temperature={room.temperature}
                        humidity={room.humidity}
                        devices={room.devices}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Odd numbered rooms */}
            <div className="space-y-4">
              <h1 className="text-base font-bold text-blue-800 dark:text-neutral-100">
                Right Side
              </h1>
              {oddRows.map((row, rowIndex) => (
                <div
                  key={`odd-row-${rowIndex}`}
                  className="flex gap-4 justify-start"
                >
                  {row.map((room, index) => (
                    <div
                      key={`odd-${rowIndex}-${index}`}
                      className="w-full cursor-pointer"
                      onClick={() => handleRoomClick(room.roomName)}
                    >
                      <RoomCard
                        roomName={room.roomName}
                        status={room.status}
                        temperature={room.temperature}
                        humidity={room.humidity}
                        devices={room.devices}
                      />
                    </div>
                  ))}
                </div>
              ))}
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
      <FloorIdPage />
    </FacilityProvider>
  );
}
