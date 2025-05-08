import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaf } from "lucide-react";

export default function GreenIndexCard() {
  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">
            <div className="flex justify-between">
              <span>GREEN INDEX</span>
              <div className="pt-1">
                <Leaf size={24} color="green" />
              </div>
            </div>
          </CardTitle>
          {/* <CardDescription>...</CardDescription> */}
        </CardHeader>
        <CardContent className="text-center">
          <div className="">
            <span className="text-[70px] text-[#2DF5B2] font-semibold">
              1204
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
