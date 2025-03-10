"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlockManagement } from "../admin/_components/BlockManagement"
import { FloorManagement } from "../admin/_components/FloorManagement"
import { RoomManagement } from "../admin/_components/RoomManagement"
import { DeviceManagement } from "../admin/_components/DeviceManagement"
import { UserManagement } from "../admin/_components/UserManagement"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Smart Building Admin Dashboard</h1>
      
      <Tabs defaultValue="blocks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="floors">Floors</TabsTrigger>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blocks">
          <BlockManagement />
        </TabsContent>
        
        <TabsContent value="floors">
          <FloorManagement />
        </TabsContent>
        
        <TabsContent value="rooms">
          <RoomManagement />
        </TabsContent>
        
        <TabsContent value="devices">
          <DeviceManagement />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
