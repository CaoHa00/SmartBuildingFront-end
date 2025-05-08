"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSpaces } from "@/hooks/use-spaces";

import BlockOverview from "@/app/(dashboard)/block/[blockId]/_components/BlockOverview";
import FloorOverview from "@/app/(dashboard)/block/[blockId]/floor/[floorId]/_components/FloorOverview";

export default function DashboardNavigation() {
  const params = useParams();
  const { getSpaceById } = useSpaces();
  const blockId = params.blockId as string;
  const block = getSpaceById(blockId);
  const floorId = params.floorId as string;
  const floor = getSpaceById(floorId);
  const roomId = params.roomId as string;
  const room = getSpaceById(roomId);

  const renderBreadcrumbs = () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-white font-bold text-base p-4">
            DASHBOARD
          </BreadcrumbLink>
        </BreadcrumbItem>
        {block ? (
          <>
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/block/${blockId}`}
                className="text-white font-bold text-base"
              >
                {block.spaceName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          <></>
        )}
        {floor ? (
          <>
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/block/${blockId}/floor/${floorId}`}
                className="text-white font-bold text-base"
              >
                {floor.spaceName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          <></>
        )}
        {room ? (
          <>
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink

                href={`/block/${blockId}/floor/${floorId}/room/${roomId}`}
                className="text-white font-bold text-base"
              >
                {room.spaceName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          <></>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col w-full">{renderBreadcrumbs()}</div>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="material">Material</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="overview">
        {room ? (
          <>{/* RoomOverview */}</>
        ) : floor ? (
          <FloorOverview />
        ) : block ? (
          <BlockOverview />
        ) : null}
      </TabsContent>
      <TabsContent value="control">{/* Control Component */}</TabsContent>
      <TabsContent value="equipment">{/* Equipment Component */}</TabsContent>
      <TabsContent value="material">{/* Material Component */}</TabsContent>
    </Tabs>
  );
}
