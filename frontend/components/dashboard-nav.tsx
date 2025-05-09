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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSpaces } from "@/hooks/use-spaces";
import { usePathname } from "next/navigation";

export default function DashboardNavigation() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const isTab = ["overview", "control", "equipment", "material"].includes(
    lastSegment
  );
  const activeTab = isTab ? lastSegment : "overview";

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
          <BreadcrumbLink href="/" className="text-white font-bold text-base">
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
    <Tabs defaultValue={activeTab} value={activeTab} className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col w-full">{renderBreadcrumbs()}</div>
        <TabsList>
          <TabsTrigger value="overview" asChild>
            <a href={pathname.replace(/\/(control|equipment|material)$/, "")}>
              Overview
            </a>
          </TabsTrigger>
          <TabsTrigger value="control" asChild>
            <a
              href={`${pathname.replace(
                /(overview|equipment|material|control)?$/,
                ""
              )}/control`}
            >
              Control
            </a>
          </TabsTrigger>
          <TabsTrigger value="equipment" asChild>
            <a
              href={`${pathname.replace(
                /(overview|control|material|equipment)?$/,
                ""
              )}/equipment`}
            >
              Equipment
            </a>
          </TabsTrigger>
          <TabsTrigger value="material" asChild>
            <a
              href={`${pathname.replace(
                /(overview|control|equipment|material)?$/,
                ""
              )}/material`}
            >
              Material
            </a>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
}
