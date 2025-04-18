"use client";

import { MoveUp } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

export default function ElectricityUsageAnalytics() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "This Week Usage",
        efficiency: "Efficiency",
      }
    : {
        title: "Mức tiêu thụ tuần",
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
                ? "text-[12px] md:text-xl"
                : "text-[13px] h-[20px] md:h-[28px] md:text-xl"
            }
          >
            {text.title}
          </p>
          <p className="text-sm md:text-xl">
            <span className="font-bold"></span> kWH
          </p>
        </div>
        <div className="absolute right-0 bottom-0 p-1 md:p-3 md:pb-1">
          <MoveUp
            className="h-[14px] w-[14px] md:h-[20px] md:w-[20px]"
            color="red"
          />
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
                : "text-[9px] h-[20px] md:h-[28px] md:text-xl pt-1 md:pt-0"
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
