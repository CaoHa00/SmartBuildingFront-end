"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  Building,
  UserCircle2,
  Logs,
  Settings,
  Cctv,
  Wallpaper,
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { ModeToggle } from "@/components/light-dark-mode-toggle";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutGrid,
  },
  {
    title: "Facility Control",
    href: "/admin/facility-control",
    icon: Building,
  },
  {
    title: "Standee Control",
    href: "/admin/standee-control",
    icon: Wallpaper,
  },
  {
    title: "Logs",
    href: "/admin/logs",
    icon: Logs,
  },
  {
    title: "CCTV",
    href: "/admin/cctv",
    icon: Cctv,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
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
      <aside className="w-64 border-r-2 bg-[hsl(var(--sidebar-background))]">
        <div className="p-6 border-b-2">
          <img
            src="/icon/logo-15yrs.svg"
            alt="Logo"
            className="h-12 w-auto mx-auto"
          />
          <h2 className="text-xl font-semibold text-[hsl(var(--card-foreground))] text-center">
            Smart Building
          </h2>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-white transition-all hover:bg-[hsl(var(--primary))] hover:text-primary-foreground",
                pathname === item.href &&
                  "bg-[hsl(var(--primary))] text-primary-foreground"
              )}
            >
              <item.icon />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-background p-8 pt-6">
        <div className="absolute top-0 right-0 mt-6 mr-8">
          <ModeToggle />
        </div>
        {children}
      </main>
      <Toaster />
    </div>
  );
}
