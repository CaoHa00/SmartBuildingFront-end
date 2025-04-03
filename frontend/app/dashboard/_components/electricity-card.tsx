import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useElectricityData } from "@/hooks/useElectricityData";
import { formatDistanceToNow } from "date-fns";
import { Zap } from "lucide-react";

export function ElectricityCard() {
  const { data, isLoading, error } = useElectricityData();

  if (error) return <div>Error loading electricity data</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Card className="w-full h-full aspect-video relative rounded-xl bg-muted/50 p-2 mx-auto text-blue-800 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          Electricity Measurements <Zap />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Electric</p>
            <p className="text-2xl font-bold">
              {data.forward_energy_total.toFixed(2)} kWh
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Active Power</p>
            <p className="text-2xl font-bold">{data.power.toFixed(2)} kW</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-2xl font-bold">{data.current.toFixed(1)} A</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Voltage</p>
            <p className="text-2xl font-bold">{data.voltage.toFixed(1)} V</p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {formatDistanceToNow(data.timestamp)} ago
        </div>
      </CardContent>
    </Card>
  );
}
