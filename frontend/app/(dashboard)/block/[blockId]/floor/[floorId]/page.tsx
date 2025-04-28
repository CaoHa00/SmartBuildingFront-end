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
import { api } from "@/lib/axios";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Room {
  id: string;
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
  const [error, setError] = useState<string | null>(null);

  // Helper function to chunk arrays into groups
  const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get(`/spaces/${params.floorId}`);
        // The response contains the floor data with rooms in the children array
        const roomsData = (response.data?.children || []).map((room: any) => ({
          id: room.spaceId,
          roomName: room.spaceName,
          status: room.occupied ? "occupied" : "available",
          temperature:
            room.equipments.find(
              (eq: any) => eq.equipmentTypeName === "Temperature"
            )?.logValue || 0,
          humidity:
            room.equipments.find(
              (eq: any) => eq.equipmentTypeName === "Humidity"
            )?.logValue || 0,
          devices: {
            ac: room.equipments.some(
              (eq: any) => eq.equipmentTypeName === "AC" && eq.logValue === 1
            ),
            light: room.equipments.some(
              (eq: any) => eq.equipmentTypeName === "Light" && eq.logValue === 1
            ),
            tv: room.equipments.some(
              (eq: any) => eq.equipmentTypeName === "TV" && eq.logValue === 1
            ),
          },
        }));
        setRooms(roomsData);
      } catch (err: any) {
        setError(err.message || "Failed to fetch rooms");
        console.error("Error fetching rooms:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.floorId) {
      fetchRooms();
    }
  }, [params.floorId]);

  const handleRoomClick = (room: Room) => {
    router.push(
      `/block/${params.blockId}/floor/${params.floorId}/room/${room.id}`
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

  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar
          className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`}
        />
        <SidebarInset className="bg-neutral-100 dark:bg-blue-950 flex flex-col h-screen overflow-hidden">
          <div className="text-center py-4 text-red-500">{error}</div>
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
      <SidebarInset className="bg-neutral-100 dark:bg-blue-950 flex flex-col h-screen">
        <header className={`flex ${isMobile ? "h-12" : "h-16"} shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 font-bold text-xl text-blue-800`}>

          <div className="flex items-center gap-2 px-2 md:px-4 dark:text-neutral-100">
            <SidebarTrigger className="-ml-1 w-5 h-5" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className={`${isMobile ? "text-lg" : "text-xl"} font-bold`}>
              {selectedFacility}
            </h1>
          </div>
        </header>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-4 p-4">
            <div className="space-y-6">
              <div>
                <h1 className="text-base font-bold text-blue-800 dark:text-neutral-100 mb-4">
                  Left Side
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {evenRooms.map((room) => (
                    <div
                      key={room.id}
                      className="w-full cursor-pointer"
                      onClick={() => handleRoomClick(room)}
                    >
                      <RoomCard
                        roomId={room.id}
                        id={room.id}
                        roomName={room.roomName}
                        status={room.status}
                        temperature={room.temperature}
                        humidity={room.humidity}
                        devices={room.devices}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h1 className="text-base font-bold text-blue-800 dark:text-neutral-100 mb-4">
                  Right Side
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {oddRooms.map((room) => (
                    <div
                      key={room.id}
                      className="w-full cursor-pointer"
                      onClick={() => handleRoomClick(room)}
                    >
                      <RoomCard
                        roomId={room.id}
                        id={room.id}
                        roomName={room.roomName}
                        status={room.status}
                        temperature={room.temperature}
                        humidity={room.humidity}
                        devices={room.devices}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
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
