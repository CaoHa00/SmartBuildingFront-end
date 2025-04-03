"use client";

import { useLanguage } from "@/components/providers/language-provider";

interface ElectricalValueProps {
  electricalReading?: number;
}

export default function ElectricityUsageChart({
  electricalReading,
}: ElectricalValueProps) {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Current Electrical Usage",
      }
    : {
        title: "Mức tiêu thụ điện hiện tại",
      };
  return (
    <div className="row-span-2 bg-[#5e83ba] rounded-xl aspect-auto px-5 py-3 mb-2">
      <p className="text-base md:text-2xl tracking-wide">{text.title}</p>
      <p className="text-5xl w-full mt-2 text-center">
        {Math.round((electricalReading ?? 0) * 100) / 100}
      </p>
      <p className="text-base w-full text-center">kWH</p>
    </div>
  );
}
