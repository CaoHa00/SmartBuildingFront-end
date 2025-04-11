"use client";

import { useLanguage } from "@/components/providers/language-provider";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface TempProps {
  temperature: number;
}

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
  ssr: false,
});

export default function TempGauge({ temperature }: TempProps) {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Temperature",
      }
    : {
        title: "Nhiệt độ",
      };

  const gaugeConfig = useMemo(
    () => ({
      minValue: 0,
      maxValue: 50,
      type: "radial" as "radial",
      size: 200,
      arc: {
        cornerRadius: 1,
        subArcs: [
          { limit: 10, color: "#fff", showTick: true },
          { limit: 20, color: "#fde704", showTick: true },
          { limit: 30, color: "#fd8004", showTick: true },
          { limit: 40, color: "#fd7a04", showTick: true },
          { limit: 50, color: "#e80612", showTick: true },
        ],
        padding: 0.005,
        gradient: true,
        width: 0.25,
      },
      pointer: { elastic: true },
      labels: {
        valueLabel: {
          style: { fontSize: 45, fontWeight: "bold", textShadow: "none" },
          formatTextValue: (value: any) => value + "º",
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
    [temperature]
  );

  return (
    <div className="bg-[#5e83ba] rounded-xl aspect-auto md:p-5">
      <div className="text-base font-bold px-3 py-2 flex justify-between">
        <p className="md:text-2xl">
          <span className="not-italic text-2xl">🌡️</span>{" "}
          <span
            className={isEnglish ? "text-[13px] md:text-2xl" : "md:text-2xl"}
          >
            {text.title}
          </span>
        </p>
        {/* <p className="font-bold text-2xl">{Math.round(temperature)}°</p> */}
      </div>
      <div
        className="w-full text-center md:h-28"
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        <GaugeComponent
          {...gaugeConfig}
          value={Math.round(temperature * 10) / 10}
        />
        {/* <p className="text-4xl font-bold text-white">
          {Math.round(temperature)}ºC
        </p> */}
      </div>
    </div>
  );
}
