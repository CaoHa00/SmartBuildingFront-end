import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";

export default function ExpectedOccupantsCard() {
  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">
            <div className="flex justify-between">
              <span>EXPECTED OCCUPANTS</span>
              <div className="pt-1">
                <User color="green" size={24} />
              </div>
            </div>
          </CardTitle>
          <CardDescription>BLOCK 8</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="m-auto">
            <span className="text-[70px] text-[#00FFFF] font-semibold">
              5000
            </span>
            <div className="text-3xl">OCCUPANTS</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
