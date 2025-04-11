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
        current: "Current",
        total: "Today's Total",
      }
    : {
        title: "Mức tiêu thụ điện",
        current: "Hiện tại",
        total: "Tổng hôm nay",
      };
  return (
    <div className="row-span-2 bg-[#5e83ba] rounded-xl aspect-auto px-5 py-3 mb-2">
      <p className="text-base md:text-2xl tracking-wide">{text.title}</p>

      <div className="flex w-full justify-around">
        <div className="text-center mt-2 w-full border-r border-white">
          <p className="text-sm">{text.current}</p>
          <p className="text-2xl">
            {Math.round((currentElectricalReading ?? 0) * 100) / 100}
          </p>
          <p className="text-sm">kW</p>
        </div>
        <div className="text-center mt-2 w-full">
          <p className="text-sm">{text.total}</p>
          <p className="text-2xl">
            {Math.round((totalElectricalReading ?? 0) * 100) / 100}
          </p>
          <p className="text-sm">kWh</p>
        </div>
      </div>
    </div>
  );
}
