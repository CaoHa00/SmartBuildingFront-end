"use client";

import { useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Building2, ChevronRight, ChevronDown, LucideIcon } from "lucide-react";
import { useState } from "react";
import { useFacility } from "@/app/context/facility-context";

interface NavFacilityProps {
  items: {
    key: string;
    name: string;
    url: string;
    icon: LucideIcon;
    spaceTypeId: string;
    spaceTypeName: string;
    spaceLevel: number;
    items?: NavFacilityProps["items"];
  }[];
}

export function NavFacility({ items }: NavFacilityProps) {
  const router = useRouter();
  const { setSelectedFacility } = useFacility();
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNavigation = (item: NavFacilityProps["items"][0]) => {
    // Update the selected facility name
    setSelectedFacility(item.name);

    if (item.spaceTypeName === "Block") {
      router.push(`/block/${item.key}`);
    } else if (item.spaceTypeName === "Floor") {
      const blockId = items.find(block => 
        block.items?.some(floor => floor.key === item.key)
      )?.key;
      router.push(`/block/${blockId}/floor/${item.key}`);
    } else if (item.spaceTypeName === "Room") {
      const blockId = items.find(block => 
        block.items?.some(floor => 
          floor.items?.some(room => room.key === item.key)
        )
      )?.key;
      const floorId = items
        .flatMap(block => block.items || [])
        .find(floor => floor.items?.some(room => room.key === item.key))?.key;
      router.push(`/block/${blockId}/floor/${floorId}/room/${item.key}`);
    }
  };

  const renderItem = (item: NavFacilityProps["items"][0], level: number = 0) => {
    const Icon = item.icon;
    const hasChildren = item.items && item.items.length > 0;
    const isExpanded = expandedItems[item.key];

    return (
      <div key={item.key} className={`${level > 0 ? 'ml-4' : ''}`}>
        <div 
          className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-sidebar-accent"
          onClick={() => handleNavigation(item)}
        >
          <div className="flex items-center gap-2 flex-1">
            {hasChildren && (
              <div
                role="button"
                onClick={(e) => toggleExpand(item.key, e)}
                className="p-1 hover:bg-blue-100 rounded-full transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </div>
            )}
            {Icon && <Icon className="w-4 h-4" />}
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {item.items?.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xl gap-2 font-bold text-blue-800 hover:text-blue-400">
        <Building2 />
        Facility
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="w-full text-blue-800">
            {items.map(item => renderItem(item))}
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
