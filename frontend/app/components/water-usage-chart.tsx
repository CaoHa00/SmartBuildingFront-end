"use client";

import { useLanguage } from "@/components/providers/language-provider";

export default function WaterUsageChart() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Current Water Usage",
      }
    : {
        title: "Mức tiêu thụ nước hiện tại",
      };
  return (
    <div className="row-span-2 bg-[#5e83ba] rounded-xl aspect-auto px-5 py-3 mb-2">
      <p className="text-base md:text-2xl tracking-wide">{text.title}</p>
    </div>
  );
}
