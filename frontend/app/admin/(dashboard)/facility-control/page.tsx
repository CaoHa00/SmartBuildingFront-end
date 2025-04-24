import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SpaceManagement } from "./_components/SpaceManagement";
import { SpaceTypeManagement } from "./_components/SpaceTypeManagement";
import EquipmentTypeManagement from "./_components/EquipmentType";
import CategoryManagement from "./_components/CategoryManagement";

const FacilityControl = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">
        Facility Control
      </h1>
      <div className="space-y-4">
        <Tabs defaultValue="spaces" className="space-y-4">
          <TabsList>
            <TabsTrigger value="spaces">Spaces</TabsTrigger>
            <TabsTrigger value="spaceType">Space Type</TabsTrigger>
            <TabsTrigger value="equipmentType">Equipment Type</TabsTrigger>
            <TabsTrigger value="category">Category</TabsTrigger>
          </TabsList>
          <TabsContent value="spaces">
            <SpaceManagement />
          </TabsContent>
          <TabsContent value="spaceType">
            <SpaceTypeManagement />
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
