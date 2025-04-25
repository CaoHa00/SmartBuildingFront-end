"use client";

import {
  Calendar,
  Eye,
  Files,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavScheduler({
  scheduler,
}: {
  scheduler: {
    title: string;
    time: string;
    location: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:px-2">
      <SidebarGroupLabel className="text-xl gap-2 font-bold text-blue-800 dark:text-neutral-100 group-data-[collapsible=icon]:justify-center">
        <Calendar className="group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5"/>
        <span className="group-data-[collapsible=icon]:hidden">Scheduler</span>
      </SidebarGroupLabel>
      <SidebarMenu className="text-xl font-bold text-blue-800 dark:text-neutral-100 group-data-[collapsible=icon]:hidden">
        {scheduler.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <div className="flex gap-2 w-full h-[40px] mb-4">
                <item.icon />
                <div className="flex w-full flex-col justify-center">
                  <span className="font-bold text-sm">
                    {item.time} - {item.location}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </div>
              </div>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Eye className="text-muted-foreground" />
                  <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Files className="text-muted-foreground" />
                  <span>Copy</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
