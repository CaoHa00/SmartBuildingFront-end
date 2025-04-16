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
import { useToast } from "@/hooks/use-toast";

interface Equipment {
  equipmentId: number;
  equipmentName: string;
  deviceId: string;
}

interface Room {
  roomId: number;
  roomName: string;
  equipments: Equipment[];
  // Adding these properties to maintain compatibility with RoomCard
  status: "available" | "occupied";
  temperature: number;
  humidity: number;
  devices: {
    ac: boolean;
    light: boolean;
    tv: boolean;
  };
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
  const { selectedFacility } = useFacility();
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
      // Transform the API response to match our component needs
      const transformedRooms = response.data.rooms.map(room => ({
        ...room,
        // Deriving status based on equipment presence with explicit type
        status: room.equipments.length > 0 ? "occupied" as const : "available" as const,
        // These are placeholder values - you might want to get real data from sensors
        temperature: 25,
        humidity: 50,
        devices: {
          ac: room.equipments.some(e => e.equipmentName.toLowerCase().includes('ac')),
          light: room.equipments.some(e => e.equipmentName.toLowerCase().includes('light')),
          tv: room.equipments.some(e => e.equipmentName.toLowerCase().includes('tv'))
        }
      }));
      setRooms(transformedRooms);
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

  const handleRoomClick = (roomName: string) => {
    const roomNumber = roomName.replace(/\D/g, "");
    router.push(`/block/${params.blockId}/floor/${params.floorId}/room/${roomNumber}`);
  };

  // Show loading state during initial render
  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`} />
        <SidebarInset className="bg-sky-300">
          <div className="text-center py-4">Loading rooms...</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Helper function to extract room number
  const getRoomNumber = (roomName: string) => {
    // Match the first sequence of numbers in the room name
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
                      onClick={() => handleRoomClick(room.roomId.toString())}
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
                      onClick={() => handleRoomClick(room.roomId.toString())}
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
