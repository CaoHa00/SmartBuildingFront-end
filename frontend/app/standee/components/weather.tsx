import { CloudSun } from "lucide-react";

export default function WeatherComponent() {
  return (
    <div className="row-span-2 bg-muted/40 rounded-xl aspect-auto pl-5 md:pl-8 pr-3 pt-2 mb-2">
      <div className="flex justify-between relative">
        <div className="">
          <p className="text-sm leading-none md:text-2xl">Thu Dau Mot</p>
          <p className="text-sm leading-none md:text-2xl">
            Friday, March 21st, 2025
          </p>
        </div>
        <div className="font-bold text-2xl pr-3">10:30</div>
      </div>
      <div className="flex justify-between md:justify-around">
        <div className="text-[80px] leading-none md:text-[150px]">34°</div>
        <CloudSun size={80} className="md:w-[180px] md:h-[180px]" />
      </div>
      <div className="text-base italic md:text-3xl mb-2">27° - 34° Cloudy</div>
    </div>
  );
}
