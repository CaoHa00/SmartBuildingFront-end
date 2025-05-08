import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const lightData = [
  { lightId: 1, lightName: "Alleyway light 1", status: "On" },
  { lightId: 2, lightName: "Alleyway light 2", status: "Off" },
  { lightId: 3, lightName: "Restroom light 1", status: "On" },
  { lightId: 4, lightName: "Restroom light 2", status: "Off" },
  { lightId: 5, lightName: "Restroom light 3", status: "Off" },
];

export default function EquipmentStatus() {
  return (
    <>
      <Card className="bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-card-foreground">
            <div className="flex justify-between">
              <span>EQUIPMENT STATUS</span>
              <div className="font-normal">
                <Select>
                  <SelectTrigger
                    className="w-[160px] rounded-lg sm:ml-auto"
                    aria-label="Select a value"
                  >
                    <SelectValue placeholder="Lights" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="light" className="rounded-lg">
                      Lights
                    </SelectItem>
                    <SelectItem value="sensor" className="rounded-lg">
                      Sensors
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardTitle>
          <CardDescription>FLOOR 1</CardDescription>
        </CardHeader>
        <CardContent>
          {lightData.map((light) => (
            <div key={light.lightId} className="flex justify-between mb-3">
              <div>{light.lightName}</div>
              <div className="flex">
                <span className="mr-2">{light.status}</span>
                {light.status === "On" ? (
                  <div className="w-5 h-5 rounded-[50%] bg-[#2DF5B2] shadow-[0_0_10px_#2DF5B2] animate-pulse"></div>
                ) : (
                  <div className="w-5 h-5 rounded-[50%] bg-[#05277E] shadow-md"></div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
