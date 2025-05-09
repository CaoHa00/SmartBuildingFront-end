"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useMemo, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";
import { useSpaces } from "@/hooks/use-spaces";
import { Space } from "@/types/space";

export default function DashboardNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const isTab = ["overview", "control", "equipment", "material"].includes(
    lastSegment
  );
  const activeTab = isTab ? lastSegment : "overview";

  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState<Space | undefined>(undefined);
  const [floor, setFloor] = useState<Space | undefined>(undefined);
  const [room, setRoom] = useState<Space | undefined>(undefined);

  const { activeBlock, activeFloor, activeRoom } = useMemo(() => {
    const pathParts = pathname.split("/");
    return {
      activeBlock:
        pathParts.indexOf("block") >= 0
          ? pathParts[pathParts.indexOf("block") + 1]
          : undefined,
      activeFloor:
        pathParts.indexOf("floor") >= 0
          ? pathParts[pathParts.indexOf("floor") + 1]
          : undefined,
      activeRoom:
        pathParts.indexOf("room") >= 0
          ? pathParts[pathParts.indexOf("room") + 1]
          : undefined,
    };
  }, [pathname]);

  const { getSpaceById } = useSpaces();
  useEffect(() => {
    const fetchSpaceData = async () => {
      const blockData = await getSpaceById(activeBlock || "");
      const floorData = await getSpaceById(activeFloor || "");
      const roomData = await getSpaceById(activeRoom || "");

      setBlock(blockData);
      setFloor(floorData);
      setRoom(roomData);
      setLoading(false);
    };

    fetchSpaceData();
  }, [activeBlock, activeFloor, activeRoom, getSpaceById]);

  const renderBreadcrumbs = () => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="text-muted-foreground text-base"
            >
              DASHBOARD
            </BreadcrumbLink>
          </BreadcrumbItem>
          {activeBlock && (
            <>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-base"
                  href={`/block/${activeBlock}`}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/block/${activeBlock}`);
                  }}
                >
                  {block?.spaceName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {activeFloor && (
            <>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-base"
                  href={`/block/${activeBlock}/floor/${activeFloor}`}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/block/${activeBlock}/floor/${activeFloor}`);
                  }}
                >
                  {floor?.spaceName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          {activeRoom && (
            <>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-base"
                  href={`/block/${activeBlock}/floor/${activeFloor}/room/${activeRoom}`}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `/block/${activeBlock}/floor/${activeFloor}/room/${activeRoom}`
                    );
                  }}
                >
                  {room?.spaceName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

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
