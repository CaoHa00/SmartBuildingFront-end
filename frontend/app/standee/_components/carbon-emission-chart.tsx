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
        today: "Today's Total",
        overLimit: "Exceeded maximum limit",
        underLimit: "Allowed range",
      }
    : {
        title: "Mức độ thải khí CO₂",
        today: "Tổng hôm nay",
        overLimit: "Vượt ngưỡng cho phép",
        underLimit: "Khoảng cho phép",
      };

  const validReading =
    electricalReading && !isNaN(electricalReading) ? electricalReading : 0;

  function CalculateCarbonFootprint(electricity: number) {
    return Math.round(((electricity * 0.8) / 1000) * 100) / 100;
  }

  const co2Emission = CalculateCarbonFootprint(validReading);

  return (
    <div className="row-span-2 bg-[#5e83ba] rounded-xl aspect-auto px-5 py-3 mb-2 relative">
      <p className="text-base md:text-2xl tracking-wide">{text.title}</p>
      <div className="flex w-full justify-around">
        <div className="text-center mt-2 w-full">
          <p className="text-sm md:text-xl">{text.today}</p>
          <p className="text-2xl md:text-3xl">
            {isNaN(co2Emission) ? "Invalid Value" : co2Emission}
          </p>
          <p className="text-sm md:text-base">tCO₂</p>
        </div>
        <div className="text-center mt-2 w-full h-full">
          <div className="text-sm leading-none md:text-base border-b border-red-500 pb-1 w-1/2 mx-auto">
            <span className="text-red-500">1tCO₂</span>
          </div>
          <CO2BarChart
            co2Emission={isNaN(co2Emission) ? 0 : co2Emission}
            key={co2Emission}
          />
        </div>
      </div>
    </div>
  );
}
