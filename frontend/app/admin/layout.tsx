"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Building2,
  Building,
  DoorClosed,
  Cpu,
  UserCircle2,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutGrid,
  },
  {
    title: "Blocks",
    href: "/admin/blocks",
    icon: Building,
  },
  {
    title: "Floors",
    href: "/admin/floors",
    icon: Building2,
  },
  {
    title: "Rooms",
    href: "/admin/rooms",
    icon: DoorClosed,
  },
  {
    title: "Devices",
    href: "/admin/devices",
    icon: Cpu,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: UserCircle2,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-sidebar-border bg-sidebar-background">
        <div className="p-6 border-b border-sidebar-border">
          <h2 className="text-xl font-semibold text-[hsl(var(--tech-dark-blue))]">
            Smart Building
          </h2>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-[hsl(var(--tech-blue))] hover:text-white",
                pathname === item.href &&
                  "bg-[hsl(var(--tech-dark-blue))] text-white"
              )}
            >
              <item.icon size={16} />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}
