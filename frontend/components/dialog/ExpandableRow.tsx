import React from 'react';
import { ChevronDown, ChevronRight } from "lucide-react";
import { LucideIcon } from 'lucide-react';

interface ExpandableRowProps {
  isOpen: boolean;
  onClick: () => void;
  level?: number;
  icon: LucideIcon;
  name: string;
  count?: number;
  id?: number;
}

export function ExpandableRow({
  isOpen,
  onClick,
  level = 0,
  icon: Icon,
  name,
  count,
  id,
}: ExpandableRowProps) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      style={{ paddingLeft: `${level * 20}px` }}
      onClick={onClick}
    >
      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      <Icon size={16} />
      <span>
        {name}{" "}
        {id && <span className="text-sm text-muted-foreground">(ID: {id})</span>}
      </span>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">({count})</span>
      )}
    </div>
  );
}