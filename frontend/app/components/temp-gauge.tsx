"use client";

import { useLanguage } from "@/components/providers/language-provider";

export default function TempGauge() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Temperature",
      }
    : {
        title: "Nhiệt độ",
      };
  return (
    <div className="bg-muted/40 rounded-xl aspect-auto px-3 py-2 md:p-5">
      <p className="italic text-base tracking-wide">{text.title}</p>
      <div className="flex justify-between">
        <p className="font-bold text-base">42°</p>
        <div className="w-full text-center h-12 md:h-28">Gauge</div>
      </div>
    </div>
  );
}
