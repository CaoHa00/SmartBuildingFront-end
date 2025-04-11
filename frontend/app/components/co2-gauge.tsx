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
    return Math.round(((electricity * 0.8) / 1000) * 10) / 10;
  }

  const text = isEnglish
    ? {
        title: "CO2 Emission",
      }
    : {
        title: "Lượng thải CO2",
      };

  const gaugeConfig = useMemo(
    () => ({
      minValue: 0,
      maxValue: 30,
      type: "radial" as "radial",
      size: 400,
      arc: {
        cornerRadius: 1,
        subArcs: [
          { limit: 7.5, color: "#16c91a", showTick: true },
          { limit: 15, color: "#fde704", showTick: true },
          { limit: 22.5, color: "#fd8004", showTick: true },
          { limit: 30, color: "#e80612", showTick: true },
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
          <span
            className={
              isEnglish ? "text-[13px] md:text-2xl" : "text-[10px] md:text-xl"
            }
          >
            {text.title}
          </span>
        </p>
      </div>
      <div
        className="w-full text-center md:h-28"
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        <GaugeComponent
          {...gaugeConfig}
          value={CalculateCarbonFootprint(electricity ?? 0)}
        />
      </div>
    </div>
  );
}
