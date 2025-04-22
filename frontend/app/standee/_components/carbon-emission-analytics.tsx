"use client";

import { MoveUp } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

export default function CarbonEmissionAnalytics() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "This Month Emission",
        efficiency: "Efficiency",
      }
    : {
        title: "Mức phát thải tháng",
        efficiency: "Hiệu năng sử dụng",
      };

  return (
    <div className="bg-[#5e83ba] flex rounded-xl aspect-auto px-2 md:px-5 py-3">
      <div className="w-1/2 relative flex border-r border-white">
        <Image
          className="md:w-[40px] md:h-[30px] md:mt-4"
          src="/icon/Water.svg"
          alt="Water"
          width={17}
          height={17}
        />
        <div className="ml-3 pt-1">
          <p
            className={
              isEnglish
                ? "text-[11px] md:text-xl"
                : "text-[11px] h-[20px] md:h-[28px] md:text-xl"
            }
          >
            {text.title}
          </p>
          <p className="text-sm md:text-xl">
            <span className="font-bold"></span> tCO₂
          </p>
        </div>
        <div className="absolute right-0 bottom-0 p-1 md:p-3 md:pb-1">
          <MoveUp
            className="h-[14px] w-[14px] md:h-[20px] md:w-[20px]"
            color="red"
          />
        </div>
      </div>
      <div className="w-1/2 relative flex pl-2 md:pl-5">
        <Image
          className="md:w-[40px] md:h-[30px] md:mt-4"
          src="/icon/Water-efficiency.svg"
          alt="Water efficiency"
          width={30}
          height={30}
        />
        <div className="ml-3 pt-1">
          <p
            className={
              isEnglish
                ? "text-[11px] md:text-xl"
                : "text-[9px] md:h-[28px] md:text-xl pt-1 md:pt-0"
            }
          >
            {text.efficiency}
          </p>
          <p className="text-sm md:text-xl">
            <span className="font-bold"></span> %
          </p>
        </div>
        <div className="absolute right-0 bottom-0 p-1 md:p-3 md:pb-1">
          <MoveUp
            className="h-[14px] w-[14px] md:h-[20px] md:w-[20px]"
            color="#02f506"
          />
        </div>
      </div>
    </div>
  );
}
