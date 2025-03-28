"use client";

import { useLanguage } from "@/components/providers/language-provider";
// import { Sunrise, Sunset } from "lucide-react";
import Image from "next/image";
// import dynamic from "next/dynamic";
// import { useState, useMemo, useEffect } from "react";

interface SunProps {
  sunrise: string;
  sunset: string;
}

// const GaugeComponent = dynamic(() => import("react-gauge-component"), {
//   ssr: false,
// });

export default function SunGauge({ sunrise, sunset }: SunProps) {
  const { isEnglish } = useLanguage();
  // const [currentTime, setCurrentTime] = useState(new Date());

  // const formattedTime = currentTime.toLocaleTimeString("en-US", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: false,
  // });

  // useEffect(() => {
  //   const timer = setInterval(() => setCurrentTime(new Date()), 500);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const text = isEnglish
    ? {
        title1: "Sunrise",
        title2: "Sunset",
      }
    : {
        title1: "Bình minh",
        title2: "Hoàng hôn",
      };

  // const gaugeConfig = useMemo(
  //   () => ({
  //     minValue: 0,
  //     maxValue: 1440,
  //     type: "radial" as "radial",
  //     size: 400,
  //     arc: {
  //       cornerRadius: 1,
  //       subArcs: [
  //         { limit: 306, color: "#120457", showTick: true },
  //         { limit: 1080, color: "#ebc746", showTick: true },
  //         { limit: 1440, color: "#120457", showTick: true },
  //       ],
  //       padding: 0.005,
  //       gradient: false,
  //       width: 0.15,
  //     },
  //     labels: {
  //       valueLabel: {
  //         style: { fontSize: 50, fontWeight: "bold", textShadow: "none" },
  //         formatTextValue: () => formattedTime,
  //         // hide: true,
  //       },
  //       tickLabels: {
  //         type: "outer" as "outer",
  //         defaultTickLineConfig: { hide: true },
  //         defaultTickValueConfig: {
  //           // formatTextValue: (value: any) => value + "",
  //           // style: { fontSize: 13, fill: "#ffffff" },
  //           hide: true,
  //         },
  //       },
  //     },
  //   }),
  //   [currentTime]
  // );

  return (
    <div className="bg-[#5e83ba] rounded-xl aspect-auto md:p-5">
      <div className="font-bold text-base tracking-wide px-3 py-2 flex">
        <p className="my-auto">
          <span className="text-2xl not-italic">🌤️</span>
        </p>
        <div className="ml-1">
          <p className={isEnglish ? "ml-2" : "text-base md:text-base"}>
            {text.title1}
          </p>
          <div
            className={
              isEnglish
                ? "mx-auto w-full border border-white ml-1"
                : "mx-auto w-full border border-white"
            }
          ></div>
          <p className={isEnglish ? "ml-2" : "text-base md:text-base"}>
            {text.title2}
          </p>
        </div>
        {/* <p className="font-bold text-2xl">{formattedTime}</p> */}
      </div>
      <div
        className="w-full text-center md:h-28"
        style={{ width: "100%", height: "150px", overflow: "hidden" }}
      >
        {/* <GaugeComponent
            {...gaugeConfig}
            value={currentTime.getHours() * 60 + currentTime.getMinutes()}
            pointer={{ type: "blob", animationDelay: 0 }}
          /> */}
        {/* <Sunrise className="mx-auto mb-[8px]" size={28} /> */}
        <Image
          src="/icon/sunrise.png"
          alt="sunrise"
          className="mx-auto mb-[3px]"
          width={30}
          height={30}
        />
        <p className="text-3xl font-extrabold text-white">{sunrise}</p>
        <div className="mx-auto w-1/2 border border-white"></div>
        <p className="text-3xl font-extrabold text-white">{sunset}</p>
        {/* <Sunset className="mx-auto mt-[5px]" size={28} /> */}
        <Image
          src="/icon/sunset.png"
          alt="sunset"
          className="mx-auto mt-[3px]"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
}
