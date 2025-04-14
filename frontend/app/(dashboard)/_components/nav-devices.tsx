"use client";

import { Cpu, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { MusicPlayerCard } from "../../../components/ui/music-player-card";

export function NavDevices({
  devices,
}: {
  devices: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden ">
      <SidebarGroupLabel className="text-xl gap-2 font-bold text-blue-800 hover:text-blue-400">
        <Cpu />
        Active Devices
      </SidebarGroupLabel>
      <SidebarMenu className="text-xl font-bold text-blue-800 hover:text-blue-400">
        <MusicPlayerCard />
        {devices.map((item) => (
          <SidebarMenuItem key={item.name}>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
