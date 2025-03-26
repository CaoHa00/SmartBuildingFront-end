"use client";

import { Leaf } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export default function AirQuality() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Air Quality",
        fresh: "Fresh",
      }
    : {
        title: "Chất lượng không khí",
        fresh: "Trong lành",
      };

  return (
    <div className="bg-muted/40 rounded-xl aspect-auto px-3 py-3 mb-2">
      <div className="flex justify-center">
        <Leaf fill="white" />
        <h1 className="text-xl md:text-3xl leading-none ml-2">{text.title}</h1>
      </div>
      <div className="w-full text-center mt-1 mb-1 h-24 md:h-40">
        <h1 className="text-[60px] md:text-[100px] leading-none text-[#02f506]">
          30
        </h1>
        <h1 className="text-4xl md:text-5xl">{text.fresh}</h1>
      </div>
      <div className="flex justify-between mt-4">
        <div className="w-full font-bold text-xs md:text-base">
          <p className="text-center text-[#02f506]">30.6</p>
          <p className="text-center">PM2.5</p>
        </div>
        <div className="w-full font-bold text-xs md:text-base">
          <p className="text-center text-[#02f506]">15.2</p>
          <p className="text-center">PM10</p>
        </div>
        <div className="w-full font-bold text-xs md:text-base">
          <p className="text-center text-[#02f506]">2.5</p>
          <p className="text-center">SO2</p>
        </div>
        <div className="w-full font-bold text-xs md:text-base">
          <p className="text-center text-[#02f506]">6.8</p>
          <p className="text-center">NO2</p>
        </div>
        <div className="w-full font-bold text-xs md:text-base">
          <p className="text-center text-[#02f506]">19.7</p>
          <p className="text-center">O2</p>
        </div>
        <div className="w-full font-bold text-xs md:text-base">
          <p className="text-center text-[#02f506]">1.9</p>
          <p className="text-center">CO</p>
        </div>
      </div>
    </div>
  );
}
