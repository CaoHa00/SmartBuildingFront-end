"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "./separator";
import { SidebarTrigger } from "./sidebar";
import { cn } from "@/lib/utils";
import { NavUser } from "../nav-user";
import { useGreeting } from "@/hooks/use-greeting";
import { BellIcon } from "lucide-react";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  showNav?: boolean;
}

export function Header({
  className,
  title,
  showNav = true,
  ...props
}: HeaderProps) {
  const isMobile = useIsMobile();
  const { greeting } = useGreeting();

  return (
    <header
      className={cn(
        `flex ${
          isMobile ? "h-14" : "h-16"
        } w-full shrink-0 items-center gap-2 border-b bg-gradient-to-r from-slate-50 via-slate-100 to-slate-200 dark:from-blue-800 dark:via-blue-700 dark:to-green-400 backdrop-blur-sm transition-all ease-in-out`,
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 px-4 md:px-6 w-full">
        {showNav && (
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1 w-5 h-5 text-slate-600 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-500 transition-colors" />
            <Separator
              orientation="vertical"
              className="h-5 bg-slate-500 dark:bg-slate-100"
            />
            <div>
              <h1 className="text-2xl uppercase font-bold text-slate-600 dark:text-slate-100">
                Smart Builidng Management System
              </h1>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4 ml-auto">
          <p className="text-base font-semibold text-slate-600 dark:text-slate-100">
            {greeting}
          </p>
          <button className="text-slate-600 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-500 transition-colors">
            <BellIcon className="w-5 h-5" />
          </button>
          <NavUser
            user={{
              name: "",
              email: "",
              avatar: "/icon/iicw.svg",
            }}
          />
        </div>
      </div>
    </header>
  );
}
