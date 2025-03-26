"use client";

import { useLanguage } from "@/components/providers/language-provider";

export default function SunGauge() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Daylight",
      }
    : {
        title: "Ánh sáng ban ngày",
      };
  return (
    <div className="bg-muted/40 rounded-xl aspect-auto px-3 py-2 md:p-5">
      <p
        className={
          isEnglish
            ? "italic text-base tracking-wide"
            : "italic text-sm leading-[1.5rem] md:text-base tracking-wide"
        }
      >
        {text.title}
      </p>
      <div className="flex justify-between">
        <p className="font-bold text-base">16:04</p>
        <div className="w-full text-center h-12 md:h-28">Gauge</div>
      </div>
    </div>
  );
}
