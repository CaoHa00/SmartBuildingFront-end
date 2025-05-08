import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf } from "lucide-react";

export default function ReusableEnergyCard() {
  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">
            <div className="flex justify-between">
              <span>RENEWABLE ENERGY</span>
              <div className="pt-1">
                <Leaf size={24} color="green" />
              </div>
            </div>
          </CardTitle>
          <CardDescription>Total Generated</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="">
            <span className="text-[70px] text-[#2DF5B2] font-semibold">
              154.5
            </span>
            <div className="text-3xl">kWh</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
