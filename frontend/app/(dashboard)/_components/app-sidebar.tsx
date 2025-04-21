"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import {
  AudioWaveform,
  LayoutDashboard,
  Command,
  Clock,
  SettingsIcon,
  HelpCircleIcon,
  Layers,
  DoorClosed,
} from "lucide-react";

import { NavFacility } from "./nav-facility";
import { NavDevices } from "./nav-devices";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavScheduler } from "./nav-scheduler";
import { NavHelper } from "./nav-helper";
// This is sample data.
const data = {
  user: {
    name: "IIC 4.0 user",
    email: "m@example.com",
    avatar: "/icon/iic-logo.svg",
  },
  teams: [
    {
      name: "IIC 4.0",
      logo: () => <img src="/icon/iic-logo.svg" alt="IIC 4.0" />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  scheduler: [
    {
      title: "On/Off AC",
      time: "12:00 PM",
      location: "Block 8",
      icon: Clock,
    },
    {
      title: "On/Off Lights",
      time: "12:30 PM",
      location: "Block 8",
      icon: Clock,
    },
  ],
  NavHelper: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
  ],
};

interface Room {
  roomId: number;
  roomName: string;
  floorId: number;
}

interface Floor {
  floorId: number;
  floorName: string;
  blockId: number;
  rooms: Room[];
}

interface Block {
  blockId: number;
  blockName: string;
  floors: Floor[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await api.get<Block[]>("/block");
        if (response.data.length > 0) {
          const formattedBlocks = response.data.map((block) => ({
            blockId: block.blockId,
            blockName: block.blockName,
            floors: block.floors,
          }));
          setBlocks(formattedBlocks);
        }
      } catch (error) {
        console.error("Failed to fetch blocks:", error);
      }
    };

    fetchBlocks();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavFacility
          items={blocks.map((block) => ({
            key: block.blockId,
            name: block.blockName,
            url: `/block/${block.blockId}`,
            icon: LayoutDashboard,
            items: block.floors?.map((floor) => ({
              key: floor.floorId,
              name: floor.floorName,
              url: `/block/${block.blockId}/floor/${floor.floorId}`,
              icon: Layers,
              items: floor.rooms?.map((room) => ({
                key: room.roomId,
                name: room.roomName,
                url: `/block/${block.blockId}/floor/${floor.floorId}/room/${room.roomId}`,
                icon: DoorClosed,
              })),
            })),
          }))}
        />
        <NavScheduler scheduler={data.scheduler} />
        <NavDevices devices={[]} />
        <NavHelper
          items={data.NavHelper}
          className="mt-auto font-bold text-blue-800"
        />
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-start">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}