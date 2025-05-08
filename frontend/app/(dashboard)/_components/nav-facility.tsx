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
import { useState, useEffect, useMemo } from "react";
import { useFacility } from "@/app/context/facility-context";
import { useSpaces } from "@/hooks/use-spaces";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

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
  const { spaces } = useSpaces();
  const [activeItemKey, setActiveItemKey] = useState<string>();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  // Memoize the active path tracking
  const { activeBlock, activeFloor, activeRoom } = useMemo(() => {
    const pathParts = pathname.split("/");
    return {
      activeBlock:
        pathParts.indexOf("block") >= 0
          ? pathParts[pathParts.indexOf("block") + 1]
          : undefined,
      activeFloor:
        pathParts.indexOf("floor") >= 0
          ? pathParts[pathParts.indexOf("floor") + 1]
          : undefined,
      activeRoom:
        pathParts.indexOf("room") >= 0
          ? pathParts[pathParts.indexOf("room") + 1]
          : undefined,
    };
  }, [pathname]);

  // Function to check if an item or any of its descendants are active
  const isItemActive = (item: NavItem): boolean => {
    if (item.key === activeItemKey) return true;
    if (item.items) {
      return item.items.some((subItem) => isItemActive(subItem));
    }
    return false;
  };

  // Initialize open sections and active state based on current path
  useEffect(() => {
    const newOpenSections = new Set<string>();
    
    if (activeBlock) {
      const blockItem = items.find(item => item.key === activeBlock);
      if (blockItem) {
        newOpenSections.add(blockItem.key);
        setSelectedFacility(blockItem.name);
      }
    }
    
    if (activeFloor) {
      newOpenSections.add(activeFloor);
    }
    
    if (activeRoom) {
      setActiveItemKey(activeRoom);
    } else if (activeFloor) {
      setActiveItemKey(activeFloor);
    } else if (activeBlock) {
      setActiveItemKey(activeBlock);
    }

    setOpenSections(newOpenSections);
  }, [items, activeBlock, activeFloor, activeRoom, setSelectedFacility]);

  const handleNavigation = (item: NavItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item || !item.key) return;

    setSelectedFacility(item.name);
    setActiveItemKey(item.key);

    setOpenSections((prev) => {
      const newSections = new Set(prev);
      newSections.add(item.key);
      return newSections;
    });

    if (item.spaceTypeName === "Block") {
      router.push(`/block/${item.key}`, { scroll: false });
    } else if (item.spaceTypeName === "Floor") {
      const parentBlock = items.find((block) =>
        block.items?.some((floor) => floor.key === item.key)
      );
      if (parentBlock) {
        router.push(`/block/${parentBlock.key}/floor/${item.key}`, {
          scroll: false,
        });
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

  const handleCollapsibleChange = (itemKey: string, isOpen: boolean, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenSections((prev) => {
      const newSections = new Set(prev);
      if (isOpen) {
        newSections.add(itemKey);
      } else {
        newSections.delete(itemKey);
      }
      return newSections;
    });
  };

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const hasChildren = item.items && item.items.length > 0;
    const isActive = isItemActive(item);
    const isOpen = openSections.has(item.key);

    const renderSubItems = (subItems: NavItem[]) => {
      return subItems.map((subItem) => {
        const hasSubChildren = subItem.items && subItem.items.length > 0;
        const isSubOpen = openSections.has(subItem.key);

        return (
          <Collapsible
            key={subItem.key}
            open={isSubOpen}
            onOpenChange={(open) => handleCollapsibleChange(subItem.key, open)}
          >
            <SidebarMenuSubItem>
              <SidebarMenuSubButton
                onClick={(e) => handleNavigation(subItem, e)}
                className={cn(
                  "flex-1 group hover:bg-blue-600 hover:text-white transition-colors relative pr-8",
                  isItemActive(subItem)
                    ? "bg-blue-700 text-sidebar-accent-foreground"
                    : ""
                )}
              >
                {subItem.icon && <subItem.icon className="w-4 h-4 mr-2" />}
                {!isCollapsed && <span>{subItem.name}</span>}
                {hasSubChildren && !isCollapsed && (
                  <CollapsibleTrigger asChild>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCollapsibleChange(subItem.key, !isSubOpen, e);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-blue-700 transition-colors"
                    >
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isSubOpen ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </CollapsibleTrigger>
                )}
              </SidebarMenuSubButton>
              {hasSubChildren && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {renderSubItems(subItem.items!)}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuSubItem>
          </Collapsible>
        );
      });
    };

    return (
      <Collapsible
        key={item.key}
        open={isOpen}
        onOpenChange={(open) => handleCollapsibleChange(item.key, open)}
      >
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip={isCollapsed ? item.name : undefined}
            onClick={(e) => handleNavigation(item, e)}
            className={cn(
              "flex-1 group hover:bg-blue-600 hover:text-white transition-colors relative pr-8",
              isActive ? "bg-blue-700 text-sidebar-accent-foreground" : ""
            )}
          >
            <Icon className="w-5 h-5" />
            {!isCollapsed && <span>{item.name}</span>}
            {hasChildren && !isCollapsed && (
              <CollapsibleTrigger asChild>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCollapsibleChange(item.key, !isOpen, e);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-blue-700 transition-colors"
                >
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
            )}
          </SidebarMenuButton>
          {hasChildren && (
            <CollapsibleContent>
              <SidebarMenuSub>{renderSubItems(item.items!)}</SidebarMenuSub>
            </CollapsibleContent>
          )}
        </SidebarMenuItem>
      </Collapsible>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xl font-bold text-neutral-100">Dashboard</SidebarGroupLabel>
      <SidebarMenu className="font-bold text-neutral-100">
        {items.map((item) => renderItem(item))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
