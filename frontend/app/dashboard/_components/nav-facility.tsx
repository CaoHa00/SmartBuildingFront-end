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

interface FacilityItem {
  key: number;
  name: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    key: number;
    name: string;
    icon?: LucideIcon;
    url: string;
    isActive?: boolean;
    items?: {
      key: number;
      name: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
      items?: {
        key: number;
        name: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
      }[];
    }[];
  }[];
}

export function NavFacility({ items }: { items: FacilityItem[] }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:px-2">
      <SidebarGroupLabel className="text-xl gap-2 font-bold text-blue-800 hover:text-blue-400 group-data-[collapsible=icon]:justify-center">
        <Building2 className="group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
        <span className="group-data-[collapsible=icon]:hidden">Facility</span>
      </SidebarGroupLabel>
      <SidebarMenu className="text-xl font-bold text-blue-800 hover:text-blue-400">
        {items.map((item) => (
          <Collapsible
            key={item.key}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.name}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <Collapsible
                      key={subItem.key}
                      asChild
                      defaultOpen={subItem.isActive}
                      className="group/subcollapsible"
                    >
                      <SidebarMenuSubItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuSubButton>
                            {subItem.icon && <subItem.icon />}
                            <span>{subItem.name}</span>
                            {subItem.items && (
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/subcollapsible:rotate-90" />
                            )}
                          </SidebarMenuSubButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {subItem.items?.map((subSubItem) => (
                              <Collapsible
                                key={subSubItem.key}
                                asChild
                                defaultOpen={subSubItem.isActive}
                                className="group/subsubcollapsible"
                              >
                                <SidebarMenuSubItem>
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuSubButton>
                                      {subSubItem.icon && <subSubItem.icon />}
                                      <span>{subSubItem.name}</span>
                                      {subSubItem.items && (
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/subsubcollapsible:rotate-90" />
                                      )}
                                    </SidebarMenuSubButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <SidebarMenuSub>
                                      {subSubItem.items?.map((finalItem) => (
                                        <SidebarMenuSubItem key={finalItem.key}>
                                          <SidebarMenuSubButton asChild>
                                            <a href={finalItem.url}>
                                              {finalItem.icon && <finalItem.icon />}
                                              <span>{finalItem.name}</span>
                                            </a>
                                          </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                      ))}
                                    </SidebarMenuSub>
                                  </CollapsibleContent>
                                </SidebarMenuSubItem>
                              </Collapsible>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuSubItem>
                    </Collapsible>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        <div className="flex gap-2 mt-4 justify-between group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:flex-row group-data-[collapsible=icon]:justify-evenly">
          <button className="rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
            <AirVent size={18} />
          </button>
          <button className="rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
            <img src="/icon/Lamp.svg" alt="Lamp Logo" width={18} height={18} />
          </button>
          <button className="rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
            <AudioLines size={18} />
          </button>
          <button className="rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
            <img src="/icon/M Wifi.svg" alt="EIU Logo" width={18} height={18} />
          </button>
          <button className="rounded-full p-2 bg-white text-blue-700 hover:bg-blue-50">
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
