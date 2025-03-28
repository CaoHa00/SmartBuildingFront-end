"use client";

import { useLanguage } from "@/components/providers/language-provider";

export default function WaterUsageChart() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Usage today",
      }
    : {
        title: "Tần suất sử dụng hôm nay",
      };
  return (
    <div className="row-span-3 bg-muted/40 rounded-xl aspect-auto px-5 py-3 mb-2">
      <p className="text-xl md:text-2xl tracking-wide">{text.title}</p>
    </div>
  );
}
