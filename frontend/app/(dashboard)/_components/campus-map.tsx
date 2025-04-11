"use client";

import { Card, CardContent } from "@/components/ui/card";

export function CampusMap() {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        {/* Add your map implementation here */}
        <div className="h-full w-full bg-blue-100 rounded-lg flex items-center justify-center">
          Interactive Campus Map
        </div>
      </CardContent>
    </Card>
  );
}
