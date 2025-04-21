"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FacilityProvider, useFacility } from "@/app/context/facility-context";
import { AppSidebar } from "../../../../_components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { RoomCard } from "./_components/roomCard";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "../../../../_components/page-header";

interface Equipment {
  equipmentId: number;
  equipmentName: string;
  deviceId: string;
}

interface Room {
  roomId: number;
  roomName: string;
  equipments: Equipment[];
}

interface FloorResponse {
  floorId: number;
  floorName: string;
  blockId: number;
  rooms: Room[];
}

export function FloorIdPage() {
  const router = useRouter();
  const params = useParams();
  const isMobile = useIsMobile();
  const { selectedFacility, setSelectedFacility } = useFacility();
  const [rooms, setRooms] = useState<Array<Room>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Helper function to chunk arrays into groups
  const chunkArray = (arr: any[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const fetchRooms = async () => {
    try {
      const response = await api.get<FloorResponse>(`/floor/${params.floorId}`);
      setRooms(response.data.rooms);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch rooms"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [params.floorId]);

  const handleRoomClick = (room: Room) => {
    setSelectedFacility(room.roomName);
    router.push(`/block/${params.blockId}/floor/${params.floorId}/room/${room.roomId}`);
  };

  // Show loading state during initial render
  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`} />
        <SidebarInset className="bg-sky-300">
          <PageHeader title={selectedFacility} />
          <div className="text-center py-4">Loading rooms...</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Helper function to extract room number
  const getRoomNumber = (roomName: string) => {
    const match = roomName.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Filter even and odd rooms based on the numeric part only
  const evenRooms = rooms.filter(
    (room) => getRoomNumber(room.roomName) % 2 === 0
  );
  const oddRooms = rooms.filter(
    (room) => getRoomNumber(room.roomName) % 2 !== 0
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
        <PageHeader title={selectedFacility} />
        <div className="flex flex-1 flex-col gap-2 md:gap-4 p-2 md:p-4 pt-0">
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
                    <div 
                      key={`even-${rowIndex}-${index}`} 
                      className="w-full cursor-pointer"
                      onClick={() => handleRoomClick(room)}
                    >
                      <RoomCard
                        roomId={room.roomId.toString()}
                        roomName={room.roomName}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Odd numbered rooms */}
            <div className="space-y-4">
              <h1 className="text-base font-bold text-blue-800">
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
                      onClick={() => handleRoomClick(room)}
                    >
                      <RoomCard
                        roomId={room.roomId.toString()}
                        roomName={room.roomName}
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
