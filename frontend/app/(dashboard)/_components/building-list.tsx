"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/lib/axios";

interface Building {
  blockId?: number;  // API might use blockId instead of id
  id?: number;       // Fallback id field
  name: string;
  status: string;
}

export function BuildingList() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const { data } = await api.get('/block');
        setBuildings(data);
      } catch (err) {
        setError('Failed to fetch buildings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Buildings</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!isLoading && !error && (
            <div className="space-y-2">
              {buildings.map((building, index) => (
                <div
                  key={building.blockId || building.id || index}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                >
                  <span>{building.name}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      building.status === "Normal"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {building.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
