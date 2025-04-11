import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useElectricityData } from "@/hooks/useElectricityData";
import { useIsMobile } from "@/hooks/use-mobile";
import { format } from "date-fns";
import { Zap } from "lucide-react";

const formatNumber = (value: number | undefined | null, decimals: number = 2) => {
  if (value === undefined || value === null) return "0";
  return value.toFixed(decimals);
};

const safeDate = (timestamp: any) => {
  if (!timestamp) return new Date();
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? new Date() : date;
};

export function ElectricityCard() {
  const { data, isLoading, error } = useElectricityData();
  const isMobile = useIsMobile();

  if (error) return <div>Error loading electricity data</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <Card
      className={`w-full h-full relative rounded-xl mx-auto text-blue-800 shadow-xl 
      bg-gradient-to-br from-white/100 to-blue-300/90 hover:shadow-blue-100/50 
      transition-all duration-300 backdrop-blur-sm border border-blue-100/50 ${
        isMobile ? "p-2" : "p-4"
      }`}
    >
      <CardHeader className={`${isMobile ? "px-2 py-3" : ""} pb-2`}>
        <CardTitle
          className={`flex items-center gap-2 font-bold ${
            isMobile ? "text-base" : "text-xl"
          }`}
        >
          Electricity Room Measurements <Zap className="text-blue-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-2 md:space-y-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
            <p
              className={`${
                isMobile ? "text-xs" : "text-sm"
              } text-blue-600/80 font-medium`}
            >
              Total Electric
            </p>
            <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold tracking-tight`}>
              {formatNumber(data?.forward_energy_power)} kWh
            </p>
          </div>
          <div className="space-y-2 md:space-y-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
            <p
              className={`${
                isMobile ? "text-xs" : "text-sm"
              } text-blue-600/80 font-medium`}
            >
              Active Power
            </p>
            <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold tracking-tight`}>
              {formatNumber(data?.active_power)} kW
            </p>
          </div>
          <div className="space-y-2 md:space-y-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
            <p
              className={`${
                isMobile ? "text-xs" : "text-sm"
              } text-blue-600/80 font-medium`}
            >
              Current
            </p>
            <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold tracking-tight`}>
              {formatNumber(data?.current, 1)} A
            </p>
          </div>
          <div className="space-y-2 md:space-y-3 p-3 rounded-lg hover:bg-white/50 transition-colors">
            <p
              className={`${
                isMobile ? "text-xs" : "text-sm"
              } text-blue-600/80 font-medium`}
            >
              Voltage
            </p>
            <p className={`${isMobile ? "text-lg" : "text-2xl"} font-bold tracking-tight`}>
              {formatNumber(data?.voltage, 1)} V
            </p>
          </div>
        </div>
        <div
          className={`${
            isMobile ? "text-xs" : "text-sm"
          } text-blue-600/70 italic`}
        >
          Last updated: {format(safeDate(data?.timestamp), 'HH:mm:ss')}
        </div>
      </CardContent>
    </Card>
  );
}
