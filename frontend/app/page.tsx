"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/app/(dashboard)/_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { FacilityProvider } from "@/app/context/facility-context";
import { useSpaces } from "@/hooks/use-spaces";
import { useSpaceTypes } from "@/hooks/use-space-types";
import { Space } from "@/types/space";
import { Card, CardContent } from "@/components/ui/card";

export function SpaceOverview() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { spaces, loading: spacesLoading, fetchSpaces } = useSpaces();
  const { spaceTypes, loading: typesLoading, fetchSpaceTypes } = useSpaceTypes();
  const [blockSpaces, setBlockSpaces] = useState<Space[]>([]);

  useEffect(() => {
    fetchSpaces();
    fetchSpaceTypes();
  }, [fetchSpaces, fetchSpaceTypes]);

  useEffect(() => {
    if (spaces && spaceTypes) {
      // Find the Block type (spaceLevel = 1)
      const blockType = spaceTypes.find(type => type.spaceLevel === 1);
      if (blockType) {
        // Filter spaces to only include blocks
        const blocks = spaces.filter(space => space.spaceTypeId === blockType.spaceTypeId);
        setBlockSpaces(blocks);
      }
    }
  }, [spaces, spaceTypes]);

  const handleSpaceClick = (spaceTypeId: string, spaceId: string) => {
    router.push(`/spaces/${spaceTypeId}/${spaceId}`);
  };

  return (
    <SidebarProvider>
      <AppSidebar className={`${isMobile ? "p-1 rounded-xl" : "p-2 rounded-3xl"}`} />
      <SidebarInset className="bg-neutral-100 dark:bg-blue-950 flex flex-col h-screen overflow-hidden">
        <header className={`flex ${isMobile ? "h-12" : "h-16"} shrink-0 items-center gap-2`}>
          <div className="flex items-center gap-2 px-2 md:px-4">
            <SidebarTrigger className="-ml-1 w-5 h-5" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className={`${isMobile ? "text-lg" : "text-xl"} font-bold text-blue-800`}>
              Campus
            </h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {spacesLoading || typesLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading blocks...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blockSpaces.map((block) => (
                <Card
                  key={block.spaceId}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSpaceClick(block.spaceTypeId, block.spaceId)}
                >
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{block.spaceName}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>Equipment: {block.equipments.length}</div>
                      <div>Floors: {block.children.length}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function Page() {
  return (
    <FacilityProvider>
      <SpaceOverview />
    </FacilityProvider>
  );
}
