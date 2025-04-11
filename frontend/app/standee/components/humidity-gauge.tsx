"use client";

import { useLanguage } from "@/components/providers/language-provider";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface HumidityProps {
  humidity: number;
}

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function HumidityGauge({ humidity }: HumidityProps) {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Humidity",
      }
    : {
        title: "Độ ẩm",
      };

  const gaugeConfig = useMemo(
    () => ({
      minValue: 0,
      maxValue: 100,
      type: "radial" as "radial",
      size: 200,
      arc: {
        cornerRadius: 1,
        subArcs: [
          { limit: 25, color: "#f2cb05", showTick: true },
          { limit: 50, color: "#80f2bd", showTick: true },
          { limit: 75, color: "#2793f2", showTick: true },
          { limit: 100, color: "#2e78a6", showTick: true },
        ],
        padding: 0.005,
        gradient: true,
        width: 0.25,
      },
      pointer: { elastic: true },
      labels: {
        valueLabel: {
          style: { fontSize: 50, fontWeight: "bold", textShadow: "none" },
          formatTextValue: (value: any) => value + "%",
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
    [humidity]
  );

  return (
    <div className="bg-[#5e83ba] rounded-xl aspect-auto md:p-5">
      <div className="font-bold text-base px-3 pt-2 flex justify-between">
        <p className="md:text-2xl">
          <span className="not-italic text-2xl">💧</span> {text.title}
        </p>
        {/* <p className="font-bold text-2xl text-white">{Math.round(humidity)}%</p> */}
      </div>
      <div
        className="w-full text-center md:h-28"
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        <GaugeComponent {...gaugeConfig} value={humidity} />
        {/* <p className="text-4xl font-bold text-white">{Math.round(humidity)}%</p> */}
      </div>
    </div>
  );
}
