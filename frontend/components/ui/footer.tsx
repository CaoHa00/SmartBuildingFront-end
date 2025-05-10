"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "standee";
}

export function Footer({
  className,
  variant = "default",
  ...props
}: FooterProps) {
  const isMobile = useIsMobile();

  const variants = {
    default: `flex items-center justify-center px-6 ${
      isMobile ? "h-14" : "h-16"
    } bg-card border-t border-slate-200/50 dark:border-slate-700/50 shadow-sm`,
    standee:
      "absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 h-16 bg-gradient-to-br from-[#080077]/80 to-[#650bf7]/80 border-t border-white/10 backdrop-blur-sm",
  };

  return (
    <footer className={cn(variants[variant], className)} {...props}>
      <div className="flex items-center gap-2">
        <img src="/icon/footer.svg" alt="IIC Logo" className="w-30 h-30" />
      </div>
    </footer>
  );
}
