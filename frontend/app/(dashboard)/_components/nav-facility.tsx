"use client";

import {
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

import { useFacility } from "@/app/context/facility-context";
import { useRouter } from "next/navigation";

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
  const { setSelectedFacility } = useFacility();
  const router = useRouter();

  const handleItemClick = (name: string, url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFacility(name);
    router.push(url);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:px-2">
      <SidebarGroupLabel className="text-xl gap-2 font-bold text-blue-800 dark:text-neutral-200 group-data-[collapsible=icon]:justify-center">
        <Building2 className="group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
        <span className="group-data-[collapsible=icon]:hidden">Facility</span>
      </SidebarGroupLabel>
      <SidebarMenu className="text-xl font-bold text-blue-800 dark:text-neutral-200 ">
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
                  {item.icon && <item.icon className="text-blue-800 dark:text-neutral-200" />}
                  <span
                    onClick={(e) => handleItemClick(item.name, item.url, e)}
                    className="text-blue-800 dark:text-neutral-200"
                  >
                    {item.name}
                  </span>
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
                      className="group/subcollapsible text-blue-800 "
                    >
                      <SidebarMenuSubItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuSubButton >
                            {subItem.icon && <subItem.icon className="text-blue-800" />}
                            <span
                              onClick={(e) =>
                                handleItemClick(subItem.name, subItem.url, e)
                              }
                             className="text-blue-800 dark:text-neutral-200"
                            >
                              {subItem.name}
                            </span>
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
                                      {subSubItem.icon && <subSubItem.icon className="text-blue-800" />}
                                      <span
                                        onClick={(e) =>
                                          handleItemClick(
                                            subSubItem.name,
                                            subSubItem.url,
                                            e
                                          )
                                        }
                                       className="text-blue-800 dark:text-neutral-200"
                                      >
                                        {subSubItem.name}
                                      </span>
                                      {subSubItem.items && (
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/subsubcollapsible:rotate-90" />
                                      )}
                                    </SidebarMenuSubButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <SidebarMenuSub>
                                      {subSubItem.items?.map((finalItem) => (
                                        <SidebarMenuSubItem key={finalItem.key}>
                                          <SidebarMenuSubButton>
                                            {finalItem.icon && (
                                              <finalItem.icon className="text-blue-800 dark:text-neutral-200" />
                                            )}
                                            <span
                                              onClick={(e) =>
                                                handleItemClick(
                                                  finalItem.name,
                                                  finalItem.url,
                                                  e
                                                )
                                              }
                                             className="text-blue-800 dark:text-neutral-200"
                                            >
                                              {finalItem.name}
                                            </span>
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
      </SidebarMenu>
    </SidebarGroup>
  );
}
