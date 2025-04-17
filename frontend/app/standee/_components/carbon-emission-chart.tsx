"use client";

import { useLanguage } from "@/components/providers/language-provider";
import CO2BarChart from "./co2-bar";
import { ElectricalValueProps } from "@/types/electricity";

export default function CarbonEmissionChart({
  totalElectricalReading,
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
    totalElectricalReading && !isNaN(totalElectricalReading)
      ? totalElectricalReading
      : 0;

  function CalculateCarbonFootprint(electricity: number) {
    return Math.round(((electricity * 0.8) / 1000) * 100) / 100;
  }

  const co2Emission = CalculateCarbonFootprint(validReading);

  return (
    <div className="row-span-2 bg-[#5e83ba] rounded-xl aspect-auto px-5 py-3 mb-2 relative">
      <p className="text-base md:text-2xl tracking-wide">{text.title}</p>
      <div className="absolute font-bold text-center max-w-11 md:max-w-16 text-[8px] md:text-[12px] right-3 top-2 md:right-5 md:top-4 text-red-500">
        {text.overLimit}
      </div>
      <div className="absolute font-bold text-center max-w-11 md:max-w-16 text-[8px] md:text-[12px] right-3 bottom-5 md:right-5 md:bottom-7 text-green-500">
        {text.underLimit}
      </div>
      <div className="flex w-full justify-around">
        <div className="text-center mt-2 w-full">
          <p className="text-sm md:text-xl">{text.today}</p>
          <p className="text-2xl md:text-3xl">
            {isNaN(co2Emission) ? "Invalid Value" : co2Emission}
          </p>
          <p className="text-sm md:text-base">tCO₂</p>
        </div>
        <div className="text-center mt-2 w-full h-full">
          <div className="text-sm leading-none md:text-base border-b border-red-500 pb-1">
            ⚠️ <span className="text-red-500">30tCO₂</span> ⚠️
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
