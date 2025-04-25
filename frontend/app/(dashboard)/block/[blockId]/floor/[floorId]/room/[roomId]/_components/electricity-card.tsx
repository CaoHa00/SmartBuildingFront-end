import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { Zap } from "lucide-react";

const formatNumber = (
  value: number | undefined | null,
  decimals: number = 2
) => {
  if (value === undefined || value === null) return "0";
  return value.toFixed(decimals);
};

const SPACE_ID = "5aa571e0-d317-4697-8970-9fc439b98030";

export function ElectricityCard() {
  const { values, loading: isLoading, getValueByName } = useEquipmentValues(SPACE_ID);
  const isMobile = useIsMobile();

  const current = getValueByName("electricCurrent");
  const activePower = getValueByName("active-power");
  const voltage = getValueByName("voltage");

  // if (isLoading) return <div>Loading...</div>;
  // if (!values.length) return null;

  return (
    <Card
      className={`w-full h-full relative rounded-xl mx-auto bg-blue-800 shadow-xl 
     dark:bg-blue-950 text-neutral-100  ${isMobile ? "p-2" : "p-4"}`}
    >
      <CardHeader className={`${isMobile ? "px-2 py-3" : ""} pb-2`}>
        <CardTitle
          className={`flex items-center gap-2 font-bold ${
            isMobile ? "text-base" : "text-xl"
          }`}
        >
          Electricity Room Measurements <Zap className="text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2 md:space-y-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
            <p className={`${isMobile ? "text-xs" : "text-sm"} text-neutral-100 font-medium`}>
              Active Power
            </p>
            <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold tracking-tight`}>
              {formatNumber(activePower)} kW
            </p>
          </div>
          <div className="space-y-2 md:space-y-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
            <p className={`${isMobile ? "text-xs" : "text-sm"} text-neutral-100 font-medium`}>
              Current
            </p>
            <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold tracking-tight`}>
              {formatNumber(current, 1)} A
            </p>
          </div>
          <div className="space-y-2 md:space-y-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
            <p className={`${isMobile ? "text-xs" : "text-sm"} text-neutral-100 font-medium`}>
              Voltage
            </p>
            <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold tracking-tight`}>
              {formatNumber(voltage, 1)} V
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
