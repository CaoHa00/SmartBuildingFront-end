"use client";

import * as React from "react";
import { useEffect, useState } from "react";
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
import { Space } from "@/types/space";
import { useSpaces } from "@/hooks/use-spaces";

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

interface NavItem {
    key: string;
    name: string;
    url: string;
    icon: any;
    spaceTypeId: string;
    spaceTypeName: string;
    spaceLevel: number;
    items?: NavItem[];
  }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { spaces, loading, fetchSpaces } = useSpaces();
  const [organizedSpaces, setOrganizedSpaces] = useState<Space[]>([]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  useEffect(() => {
    if (spaces) {
      // Filter for root level spaces (blocks - no parentId)
      const blocks = spaces.filter(space => space.parentId === null);
      setOrganizedSpaces(blocks);
    }
  }, [spaces]);

  const mapSpaceToNavItem = (space: Space): NavItem => ({
    key: space.spaceId,
    name: space.spaceName,
    url: `/block/${space.spaceId}`,
    icon: space.spaceTypeName === "Block" ? LayoutDashboard :
          space.spaceTypeName === "Floor" ? Layers :
          DoorClosed,
    spaceTypeId: space.spaceTypeId,
    spaceTypeName: space.spaceTypeName,
    spaceLevel: space.spaceTypeName === "Block" ? 1 :
                space.spaceTypeName === "Floor" ? 2 : 3,
    items: space.children?.map(mapSpaceToNavItem)
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavFacility items={organizedSpaces.map(mapSpaceToNavItem)} />
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
