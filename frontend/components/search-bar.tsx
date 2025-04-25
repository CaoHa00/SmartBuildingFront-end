"use client";

import * as React from "react";
import { Input } from "./ui/input";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-4 w-4 text-slate-400 dark:text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <Input
        type="search"
        placeholder="Search spaces, devices..."
        className="w-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm pl-10 pr-4 h-9 rounded-full border-slate-200 dark:border-slate-700 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-400"
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
    </div>
  );
}
