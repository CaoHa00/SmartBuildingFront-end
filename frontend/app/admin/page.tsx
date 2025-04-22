import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuildingSummary from "./_components/BuildingOverview";

export default function AdminDashboard() {
  return (
    <div className="p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Tabs defaultValue="bulding-summary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bulding-summary">Builiding Summary</TabsTrigger>
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
    </div>
  );
}
