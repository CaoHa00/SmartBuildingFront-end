"use client";

import {
  AirVent,
  AudioLines,
  Building2,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavFacility({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:px-2">
      <SidebarGroupLabel className="text-xl gap-2 font-bold text-blue-800 hover:text-blue-400 group-data-[collapsible=icon]:justify-center">
        <Building2 className="group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
        <span className="group-data-[collapsible=icon]:hidden">Facility</span>
      </SidebarGroupLabel>
      <SidebarMenu className="text-xl font-bold text-blue-800 hover:text-blue-400">
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        <div className="flex gap-2 mt-4 justify-between">
          <button className="rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
            <AirVent size={20} />
          </button>
          <button className=" rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
            <img src="/icon/Lamp.svg" alt="Lamp Logo" width={18} height={18} />
          </button>
          <button className=" rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
            <AudioLines size={20} />
          </button>
          <button className=" rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
            <img src="/icon/M Wifi.svg" alt="EIU Logo" width={18} height={18} />
          </button>
          <button className=" rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
            <img
              src="/icon/Lock.svg"
              alt="Lock Button"
              width={18}
              height={18}
            />
          </button>
        </div>
      </SidebarMenu>
    </SidebarGroup>
  );
}
