"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuildingSummary from "./_components/BuildingOverview";
import { useIsMobile } from "@/hooks/use-mobile";
import { Footer } from "@/components/ui/footer";

export default function AdminDashboard() {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 p-4 pb-20">
        <Tabs defaultValue="bulding-summary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bulding-summary">Building Summary</TabsTrigger>
            <TabsTrigger value="bms">BMS Overview</TabsTrigger>
            <TabsTrigger value="metering">Metering</TabsTrigger>
            <TabsTrigger value="lighting">Lighting</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="equipment">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="bulding-summary">
            <BuildingSummary />
          </TabsContent>

          <TabsContent value="bms"></TabsContent>
          <TabsContent value="metering"></TabsContent>
          <TabsContent value="lighting"></TabsContent>
          <TabsContent value="energy"></TabsContent>
          <TabsContent value="equipment"></TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}
