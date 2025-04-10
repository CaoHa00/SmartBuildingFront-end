import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlockManagement } from "./_components/BlockManagement";
import EquipmentTypeManagement from "./_components/EquipmentType";
import CategoryManagement from "./_components/CategoryManagement";

const FacilityControl = () => {
  return (
    <div className=" p-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-500">
        Facility Control
      </h1>
      <div className="space-y-4">
        <p className="text-blue-500">Manage your facility here.</p>
        <Tabs defaultValue="blocks" className="space-y-4">
          <TabsList>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="equipmentType">Equipment Type</TabsTrigger>
            <TabsTrigger value="category">Category</TabsTrigger>
          </TabsList>
          <TabsContent value="blocks">
            <BlockManagement />
          </TabsContent>
          <TabsContent value="equipmentType">
            <EquipmentTypeManagement />
          </TabsContent>
          <TabsContent value="category">
            <CategoryManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacilityControl;
