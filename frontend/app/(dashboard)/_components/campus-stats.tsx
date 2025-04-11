"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CampusStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campus Statistics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex justify-between">
          <span>Total Buildings</span>
          <span className="font-bold">12</span>
        </div>
        <div className="flex justify-between">
          <span>Active Devices</span>
          <span className="font-bold">245</span>
        </div>
        <div className="flex justify-between">
          <span>Total Energy</span>
          <span className="font-bold">1,234 kWh</span>
        </div>
      </CardContent>
    </Card>
  );
}
