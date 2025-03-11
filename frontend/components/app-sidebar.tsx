"use client";

import * as React from "react";
import {
  AudioWaveform,
  Building2,
  Clock,
  Command,
  HouseWifi,
  MessageCircleQuestion,
  Search,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Room",
      url: "#",
      icon: Building2,
      submenu: [
        { title: "Room List", url: "#" },
        { title: "Room Status", url: "#" },
        { title: "Room Management", url: "#" }
      ]
    },
    {
      title: "Schedule",
      url: "#",
      icon: Clock,
      submenu: [
        { title: "Daily Schedule", url: "#" },
        { title: "Weekly Schedule", url: "#" },
        { title: "Calendar View", url: "#" }
      ]
    },
    {
      title: "Active Devices",
      url: "#",
      icon: HouseWifi,
      badge: "10",
      submenu: [
        { title: "All Devices", url: "#" },
        { title: "Connected Devices", url: "#" },
        { title: "Device Status", url: "#" }
      ]
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <img src="logo.svg" className="w-40" alt="Sidebar Logo" />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <NavUser
        user={{
          name: "Duck Hwee",
          email: "huyme666@gmail.com",
          avatar: "",
        }}
      />
      <SidebarRail />
    </Sidebar>
  );
}
