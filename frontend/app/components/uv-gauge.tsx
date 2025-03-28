"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { useMemo } from "react";
import dynamic from "next/dynamic";

interface UVProps {
  uvIndex: number;
}

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function UVGauge({ uvIndex }: UVProps) {
  const { isEnglish } = useLanguage();
  const text = isEnglish
    ? {
        title: "UV",
      }
    : {
        title: "UV",
      };
  const gaugeConfig = useMemo(
    () => ({
      minValue: 0,
      maxValue: 10,
      type: "radial" as "radial",
      size: 200,
      arc: {
        cornerRadius: 1,
        subArcs: [
          { limit: 3, color: "#ffffff", showTick: true },
          { limit: 6, color: "#d8a6ff", showTick: true },
          { limit: 8, color: "#a54aed", showTick: true },
          { limit: 10, color: "#8509e6", showTick: true },
        ],
        padding: 0.005,
        gradient: true,
        width: 0.25,
      },
      pointer: { elastic: true },
      labels: {
        valueLabel: {
          style: { fontSize: 50, fontWeight: "bold", textShadow: "none" },
          formatTextValue: (value: any) => value + "",
          // hide: true,
        },
        tickLabels: {
          type: "outer" as "outer",
          defaultTickLineConfig: { hide: true },
          defaultTickValueConfig: {
            // formatTextValue: (value: any) => value + "",
            // style: { fontSize: 13, fill: "#ffffff" },
            hide: true,
          },
        },
      },
    }),
    []
  );
  return (
    <div className="bg-[#5e83ba] rounded-xl aspect-auto md:p-5">
      <div className="font-bold text-base px-3 pt-2 flex justify-between">
        <p>
          <span className="not-italic text-2xl">☀️</span> {text.title}
        </p>
        {/* <p className="text-white text-2xl font-bold not-italic">
          {Math.round(uvIndex * 100) / 100}
        </p> */}
      </div>
      <div
        className="w-full text-center md:h-28"
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        <GaugeComponent {...gaugeConfig} value={uvIndex} />
        {/* <p className="text-4xl font-bold text-white">
          {Math.round(uvIndex * 100) / 100}
        </p> */}
      </div>
    </div>
  );
}
