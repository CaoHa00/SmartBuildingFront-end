"use client";

import { useState } from "react";
import { Switch } from "./switch";
import { LucideIcon } from "lucide-react";

interface DeviceControllerProps {
  name: string;
  icon: LucideIcon;
  isActive: boolean;
}

export function DeviceController({ name, icon: Icon, isActive: initialState }: DeviceControllerProps) {
  const [isActive, setIsActive] = useState(initialState);

  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${isActive ? 'text-blue-800' : 'text-gray-400'}`} />
        <span className="font-medium">{name}</span>
      </div>
      <Switch checked={isActive} onCheckedChange={setIsActive} />
    </div>
  );
}