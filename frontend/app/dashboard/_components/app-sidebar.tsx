"use client";

import * as React from "react";
import {
  AudioWaveform,
  LayoutDashboard,
  Command,
  Frame,
  Map,
  PieChart,
  Clock,
  Settings,
  Info,
} from "lucide-react";

import { NavFacility } from "@/app/dashboard/_components/nav-facility";
import { NavDevices } from "@/app/dashboard/_components/nav-devices";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SearchBar from "@/components/search-bar";
import { NavScheduler } from "@/app/dashboard/_components/nav-scheduler";
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
  facility: [
    {
      title: "Block 8",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "103.B11",
          url: "#",
        },
        {
          title: "104.B11",
          url: "#",
        },
        {
          title: "105.B11",
          url: "#",
        },
      ],
    },
    {
      title: "Block 10",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Block 11",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Block 5",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <SearchBar />
      </SidebarHeader>
      <SidebarContent>
        <NavFacility items={data.facility} />
        <NavScheduler scheduler={data.scheduler} />
        <NavDevices devices={[]} />
      </SidebarContent>
      <SidebarFooter className="flex flex-col items-start">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
