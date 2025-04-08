"use client";

import { useLanguage } from "@/components/providers/language-provider";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface CO2Props {
  electricity?: number;
}

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function CO2Gauge({ electricity }: CO2Props) {
  const { isEnglish } = useLanguage();

  function CalculateCarbonFootprint(electricity: number) {
    return Math.round(((electricity * 0.8) / 1000) * 100) / 100;
  }

  const text = isEnglish
    ? {
        title: "CO2 Emission",
      }
    : {
        title: "Dấu chân Carbon",
      };

  const gaugeConfig = useMemo(
    () => ({
      minValue: 0,
      maxValue: 6000,
      type: "radial" as "radial",
      size: 400,
      arc: {
        cornerRadius: 1,
        subArcs: [
          { limit: 1000, color: "#16c91a", showTick: true },
          { limit: 3000, color: "#fde704", showTick: true },
          { limit: 5000, color: "#fd8004", showTick: true },
          { limit: 6000, color: "#e80612", showTick: true },
        ],
        padding: 0.005,
        gradient: true,
        width: 0.25,
      },
      pointer: { elastic: true },
      labels: {
        valueLabel: {
          style: { fontSize: 50, fontWeight: "bold", textShadow: "none" },
          formatTextValue: (value: any) => value + "t",
        },
        tickLabels: {
          type: "outer" as "outer",
          defaultTickLineConfig: { hide: true },
          defaultTickValueConfig: {
            hide: true,
          },
        },
      },
    }),
    [electricity]
  );

  return (
    <div className="bg-[#5e83ba] rounded-xl aspect-auto md:p-5">
      <div className="font-bold text-base tracking-wide px-3 py-2 flex">
        <p className="my-auto">
          <span className="text-2xl not-italic">🌤️</span>{" "}
          <span className={isEnglish ? "text-[13px]" : "text-[10px]"}>
            {text.title}
          </span>
        </p>
      </div>
      <div
        className="w-full text-center md:h-28"
        style={{ width: "100%", height: "150px", overflow: "hidden" }}
      >
        <GaugeComponent
          {...gaugeConfig}
          value={CalculateCarbonFootprint(electricity!)}
        />
      </div>
    </div>
  );
}
