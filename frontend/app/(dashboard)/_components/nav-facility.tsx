"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useFacility } from "@/app/context/facility-context";
import { useSpaces } from "@/hooks/use-spaces";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

interface NavFacilityProps {
  items: NavItem[];
}

export function NavFacility({ items }: NavFacilityProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setSelectedFacility } = useFacility();
  const { spaces, loading } = useSpaces();
  const [activeItemKey, setActiveItemKey] = useState<string>();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Set initial active state based on current pathname
  useEffect(() => {
    const pathParts = pathname.split('/');
    const findActiveItem = (items: NavItem[]): NavItem | undefined => {
      for (const item of items) {
        if (item.spaceTypeName === "Block" && pathname.includes(`/block/${item.key}`)) {
          return item;
        }
        if (item.items) {
          const found = findActiveItem(item.items);
          if (found) return found;
        }
      }
      return undefined;
    };

    const activeItem = findActiveItem(items);
    if (activeItem) {
      setActiveItemKey(activeItem.key);
      setSelectedFacility(activeItem.name);
    }
  }, [pathname, items, setSelectedFacility]);

  const handleNavigation = (item: NavItem) => {
    if (!item || !item.key) return;

    setSelectedFacility(item.name);
    setActiveItemKey(item.key);

    if (item.spaceTypeName === "Block") {
      router.push(`/block/${item.key}`, { scroll: false });
    } else if (item.spaceTypeName === "Floor") {
      const parentBlock = items.find((block) =>
        block.items?.some((floor) => floor.key === item.key)
      );
      if (parentBlock) {
        router.push(`/block/${parentBlock.key}/floor/${item.key}`, { scroll: false });
      }
    } else if (item.spaceTypeName === "Room") {
      for (const block of items) {
        if (!block.items) continue;
        for (const floor of block.items) {
          if (floor.items?.some((room) => room.key === item.key)) {
            router.push(
              `/block/${block.key}/floor/${floor.key}/room/${item.key}`,
              { scroll: false }
            );
            return;
          }
        }
      }
    }
  };

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const hasChildren = item.items && item.items.length > 0;
    const isActive = activeItemKey === item.key;

    return (
      <Collapsible
        key={item.key}
        asChild
        defaultOpen={isActive}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={isCollapsed ? item.name : undefined}
              onClick={() => handleNavigation(item)}
              className={
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : ""
              }
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span>{item.name}</span>}
              {hasChildren && !isCollapsed && (
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {hasChildren && (
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.key}>
                    <SidebarMenuSubButton
                      onClick={() => handleNavigation(subItem)}
                      className={
                        activeItemKey === subItem.key
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : ""
                      }
                    >
                      {subItem.icon && <subItem.icon className="w-4 h-4 mr-2" />}
                      {!isCollapsed && <span>{subItem.name}</span>}
                    </SidebarMenuSubButton>
                    {subItem.items && (
                      <SidebarMenuSub>
                        {subItem.items.map((roomItem) => (
                          <SidebarMenuSubItem key={roomItem.key}>
                            <SidebarMenuSubButton
                              onClick={() => handleNavigation(roomItem)}
                              className={
                                activeItemKey === roomItem.key
                                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                  : ""
                              }
                            >
                              {roomItem.icon && (
                                <roomItem.icon className="w-4 h-4 mr-2" />
                              )}
                              {!isCollapsed && <span>{roomItem.name}</span>}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </SidebarMenuItem>
      </Collapsible>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex items-center text-xl font-bold text-neutral-100 justify-between">
        Dashboard
      </SidebarGroupLabel>
      <SidebarMenu>{items.map((item) => renderItem(item))}</SidebarMenu>
    </SidebarGroup>
  );
}
