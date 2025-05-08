"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlockOverview from "../block/_components/BlockOverview";

export default function DashboardNavigation() {
  const params = useParams();
  const blockId = params.blockId as string;
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <div className="flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-white font-bold text-base"
              >
                DASHBOARD
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={blockId}
                className="text-white font-bold text-base"
              >
                Block 8
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="control">Control</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="material">Material</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="overview">
        <BlockOverview />
      </TabsContent>
      <TabsContent value="control">{/* Control Component */}</TabsContent>
      <TabsContent value="equipment">{/* Equipment Component */}</TabsContent>
      <TabsContent value="material">{/* Material Component */}</TabsContent>
    </Tabs>
  );
}
