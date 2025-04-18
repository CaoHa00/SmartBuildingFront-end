"use client";

import { useLanguage } from "@/components/providers/language-provider";

export default function EnergySave() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        title: "Energy Save up _% this year",
        description: "Show Total Energy for the last year",
      }
    : {
        title: "Tiết kiệm năng lượng lên đến _% trong năm",
        description: "Thể hiện tổng năng lượng tiêu hao trong năm qua",
      };
  return (
    <div className="w-1/2 text-center">
      <p
        className={
          isEnglish
            ? "md:text-xl ml-3 text-sm font-bold"
            : "md:text-xl ml-3 text-[12px] font-bold"
        }
      >
        {text.title}
      </p>
      <p
        className={
          isEnglish ? "md:text-xl ml-3 text-sm" : "md:text-xl ml-3 text-[12px]"
        }
      >
        {text.description}
      </p>
      <div className="">Chart</div>
    </div>
  );
}
