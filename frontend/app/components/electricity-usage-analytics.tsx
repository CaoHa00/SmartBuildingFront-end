"use client";

import { MoveUp } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

export default function ElectricityUsageAnalytics() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Week Usage",
        efficiency: "Efficiency",
      }
    : {
        title: "Tần suất sử dụng tuần",
        efficiency: "Hiệu năng sử dụng",
      };

  return (
    <div className="bg-[#5e83ba] flex rounded-xl aspect-auto px-2 md:px-5 py-3">
      <div className="w-1/2 relative flex border-r border-white">
        <Image
          className="md:w-[40px] md:h-[30px] md:mt-4"
          src="/icon/Electric.svg"
          alt="Electric"
          width={17}
          height={17}
        />
        <div className="ml-3 pt-1">
          <p
            className={
              isEnglish
                ? "text-sm md:text-xl"
                : "text-[10px] h-[20px] md:text-lg"
            }
          >
            {text.title}
          </p>
          <p className="text-sm md:text-xl">
            <span className="font-bold">25,5</span> KwH
          </p>
        </div>
        <div className="absolute right-0 p-1 md:p-3">
          <MoveUp size={18} className="h-12" color="red" />
        </div>
      </div>
      <div className="w-1/2 relative flex pl-2 md:pl-5 pr-3">
        <Image
          className="md:w-[40px] md:h-[30px] md:mt-4"
          src="/icon/Electric-efficiency.svg"
          alt="Electric efficiency"
          width={30}
          height={30}
        />
        <div className="ml-3 pt-1">
          <p
            className={
              isEnglish
                ? "text-sm md:text-xl"
                : "text-[9px] h-[20px] md:text-lg"
            }
          >
            {text.efficiency}
          </p>
          <p className="text-sm md:text-xl">
            <span className="font-bold">43,5</span> %
          </p>
        </div>
        <div className="absolute right-0 p-1 md:p-3">
          <MoveUp size={18} className="h-12" color="#02f506" />
        </div>
      </div>
    </div>
  );
}
