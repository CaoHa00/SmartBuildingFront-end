"use client";

import { useLanguage } from "@/components/providers/language-provider";

interface ElectricalValueProps {
  currentElectricalReading?: number;
  totalElectricalReading?: number;
}

export default function ElectricityUsageChart({
  currentElectricalReading,
  totalElectricalReading,
}: ElectricalValueProps) {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Electrical Usage",
      }
    : {
        title: "Mức tiêu thụ điện",
      };
  return (
    <div className="row-span-2 bg-[#5e83ba] rounded-xl aspect-auto px-5 py-3 mb-2">
      <p className="text-base md:text-2xl tracking-wide">{text.title}</p>

      <div className="flex w-full justify-around">
        <div className="text-center mt-2 w-full border-r border-white">
          <p className="text-base">Current</p>
          <p className="text-3xl">
            {Math.round((currentElectricalReading ?? 0) * 100) / 100}
          </p>
          <p className="text-base">kWH</p>
        </div>
        <div className="text-center mt-2 w-full">
          <p className="text-base">Today's Total</p>
          <p className="text-3xl">
            {Math.round((totalElectricalReading ?? 0) * 100) / 100}
          </p>
          <p className="text-base">kWH</p>
        </div>
      </div>

    </div>
  );
}
