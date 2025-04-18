"use client";

import { Square } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export default function EnergyUser() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Energy Usage",
        dropdown: "Last Year",
        consumesLegend: "Consumes",
        efficiencyLegend: "Efficiency",
      }
    : {
        title: "Năng lượng tiêu thụ",
        dropdown: "1 Năm",
        consumesLegend: "Tiêu thụ",
        efficiencyLegend: "Hiệu năng",
      };
  return (
    <div className="w-1/2">
      <div className="flex justify-between h-6 md:h-8 mb-5 md:mb-9">
        <div className="">
          <p
            className={
              isEnglish
                ? "ml-3 md:text-3xl tracking-wide"
                : "ml-3 text-base md:text-3xl tracking-wide mb-1"
            }
          >
            {text.title}
          </p>
          <div className="ml-2 flex md:mt-1">
            <div className="text-[8px] md:text-[12px] flex mr-4">
              <Square
                size={8}
                className="h-3 md:h-4 mr-1 md:w-[10px] md:h-[10px]"
                fill="#55fbff"
                color="#55fbff"
              />
              {text.consumesLegend}
            </div>
            <div className="text-[8px] md:text-[12px] flex">
              <Square
                size={8}
                className="h-3 md:h-4 mr-1 md:w-[10px] md:h-[10px]"
                fill="#0f4da8"
                color="#0f4da8"
              />
              {text.efficiencyLegend}
            </div>
          </div>
        </div>
        <div className="w-1/3 md:w-1/4 bg-muted/60 px-3 py-1 md:py-2 rounded-sm text-[10px] md:text-sm mr-2">
          {text.dropdown}
        </div>
      </div>
      <div className="h-[150px] bg-muted/60 mt-3 mr-2 rounded-xl"></div>
    </div>
  );
}
