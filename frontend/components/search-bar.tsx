"use client" ;
import {  Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Button } from "./ui/button";
import React from "react";

export default function SearchBar() {
  return (
    <div className="w-full flex-1 md:w-auto md:flex-none">
      <CommandMenu>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          className="w-full justify-between md:w-40 lg:w-64 text-white bg-blue-900/75 hover:bg-blue-900"
        >
          <Search className="w-4 h-4 mr-2" />
          Search...
          <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex text-white">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </CommandMenu>
    </div>
  )
}

// Command Menu Content
export function CommandMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const suggestions = [
    { value: "profile", label: "Profile", icon: null },
    { value: "settings", label: "Settings", icon: null },
    { value: "logout", label: "Logout", icon: null },
  ];

  return (
    <Command>
      {children}
      <CommandInput 
        placeholder="Type a command or search..."
        className="text-white placeholder:text-gray-400"
      />
      <CommandList className="text-white">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions" className="text-white">
          {suggestions.map((suggestion) => (
            <CommandItem
              key={suggestion.value}
              value={suggestion.value}
              className="text-white hover:bg-blue-900"
            >
              {suggestion.icon && React.createElement(suggestion.icon, { className: "mr-2 h-4 w-4 text-white" })}
              <span>{suggestion.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
