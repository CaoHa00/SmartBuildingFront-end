"use client";

// import { Square } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { WeeklyCo2EmissionChart } from "./weekly-co2-emission-chart";

export default function CO2Usage() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "CO₂ Emission",
        dropdown: "Last week",
        consumesLegend: "Emits",
        efficiencyLegend: "Efficiency",
      }
    : {
        title: "Lượng khí thải CO₂",
        dropdown: "Tuần trước",
        consumesLegend: "Tỏa ra",
        efficiencyLegend: "Hiệu năng",
      };
  return (
    <div className="w-full">
      <div className="flex justify-between h-6 md:h-8 mb-3 md:mb-9">
        <div className="">
          <p className="ml-1 md:text-3xl tracking-wide">{text.title}</p>
          {/* <div className="ml-2 flex md:mt-1">
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
          </div> */}
        </div>
        <div className="w-1/3 md:w-1/4 bg-muted/60 px-3 py-1 md:py-2 rounded-sm text-[10px] md:text-sm">
          {text.dropdown}
        </div>
      </div>
      <div className="h-[157px] bg-muted/60 mt-3 rounded-xl">
        <WeeklyCo2EmissionChart />
      </div>
    </div>
  );
}
