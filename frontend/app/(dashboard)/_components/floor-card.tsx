"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FloorCardProps {
  floorName: string;
  occupancy: number;
  temperature: number;
  humidity: number;
  totalRooms: number;
  activeRooms: number;
}

export const FloorCard = ({
  floorName,
  occupancy,
  temperature,
  humidity,
  totalRooms,
  activeRooms,
}: FloorCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-4 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.02] transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          {floorName}
        </h3>
        <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
          {activeRooms}/{totalRooms} rooms active
        </span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Occupancy</span>
            <span className="font-medium text-slate-900 dark:text-white">{occupancy}%</span>
          </div>
          <Progress value={occupancy} className="h-1.5" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm text-slate-600 dark:text-slate-400">Temperature</span>
            </div>
            <p className="text-lg font-medium text-slate-900 dark:text-white">
              {temperature}°C
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <span className="text-sm text-slate-600 dark:text-slate-400">Humidity</span>
            </div>
            <p className="text-lg font-medium text-slate-900 dark:text-white">
              {humidity}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
