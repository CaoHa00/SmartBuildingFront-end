"use client";

import { useLanguage } from "@/components/providers/language-provider";
import CO2BarChart from "./co2-bar";

interface ElectricalValueProps {
  electricalReading?: number;
}

export default function CarbonEmissionChart({
  electricalReading,
}: ElectricalValueProps) {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Carbon Emission",
      }
    : {
        title: "Mức độ thải khí CO₂",
      };
  return (
    <div className="row-span-2 bg-[#5e83ba] rounded-xl aspect-auto px-5 py-3 mb-2">
      <p className="text-base md:text-2xl tracking-wide">{text.title}</p>
      <div className="flex w-full justify-around">
        <div className="text-center mt-2 w-full">
          <p className="text-base">Today's Total</p>
          <p className="text-3xl">
            {Math.round((((electricalReading ?? 0) * 0.8) / 1000) * 100) / 100}
          </p>
          <p className="text-base">tCO₂</p>
        </div>
        <div className="text-center mt-2 w-full h-full">
          <CO2BarChart
            co2Emission={
              Math.round((((electricalReading ?? 0) * 0.8) / 1000) * 100) / 100
            }
          />
        </div>
      </div>
    </div>
  );
}
