import { useParams } from "next/navigation";
import {
  Droplet,
  Fan,
  Power,
  Snowflake,
  Thermometer,
  Wind,
} from "lucide-react";
import { useEquipmentValues } from "@/hooks/use-equipment-values";
import { Card } from "@/components/ui/card";
import React from "react";

const AcCard = () => {
  const params = useParams();
  const { getValueByName, loading } = useEquipmentValues(
    params.roomId as string
  );
  const [temperature, setTemperature] = React.useState(25);

//   const temperature = getValueByName("ac-temperature") ?? "--";
  const powerStatus = getValueByName("ac-power") === 1;
  const mode = String(getValueByName("ac-mode") ?? "unknown");
  const fanSpeed = getValueByName("ac-fan-speed") ?? "--";

  if (loading) {
    return (
      <Card className="p-4 space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </Card>
    );
  }

  const formatMode = (mode: string) => {
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  };

  return (
    <div className="rounded-xl bg-blue-800 dark:bg-blue-900 w-full  h-full shadow-xl p-4">
      <div className="ml-3">
        <h2 className="flex font-bold tracking-wide text-xl text-neutral-100 dark:text-neutral-100 leading-none">
          AIR CONDITIONERS
        </h2>
        <p className="tracking-widest text-neutral-100 text-xs font-thin leading-none">
          Auto Cooling
        </p>
      </div>
      <div className="bg-blue-800 text-white p-4 rounded-xl mt-4">
        <div className="space-y-6">
          {/* Thermostat Control */}
          <div className="thermostat-container relative w-[200px] h-[200px] mx-auto">
            {/* Temperature display */}
            <div className="absolute inset-0 flex flex-col items-center text-2xl text-yellow-500 font-bold justify-center">
              <span className="text-8xl font-bold text-white">
                {temperature}°C
              </span>
              <span className="text-sm text-neutral-200">Temperature</span>
            </div>
          </div>

          {/* Mode Controls */}
          <div className="flex justify-evenly items-center">
            <button className="p-2 rounded-full text-white">
              <Wind />
            </button>
            <button className="p-3 rounded-full bg-blue-600 text-white ">
              <Snowflake size={30} />
            </button>
            <button className="p-2 rounded-full text-white">
              <Droplet />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcCard;
