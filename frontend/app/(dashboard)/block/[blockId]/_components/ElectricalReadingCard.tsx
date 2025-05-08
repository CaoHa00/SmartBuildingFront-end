"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCurrentElectricalReading from "@/hooks/use-current-electrical-reading";
import useTotalElectricalReading from "@/hooks/use-total-electrical-reading";

export default function ElectricalReadingCard() {
  const currentReading = useCurrentElectricalReading();
  const totalReading = useTotalElectricalReading();

  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-xl card-foreground">
            <div className="flex justify-between">
              <span>ELECTRICITY</span>
              <div className="pt-1">
                <svg
                  className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </CardTitle>
          <CardDescription>BLOCK 8</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="m-auto mt-5">
            <div>Current Consumption</div>
            <span className="text-[70px] text-[#00FFFF] font-semibold leading-none">
              {Math.round(
                currentReading ? currentReading.electricalReading : 0
              )}
            </span>
            <div className="text-3xl">kW</div>
          </div>
          <div className="m-auto mt-20">
            <div>Today's Total</div>
            <span className="text-[70px] text-[#00FFFF] font-semibold leading-none">
              {Math.round(totalReading ? totalReading.cumulativeEnergy : 0)}
            </span>
            <div className="text-3xl">kWh</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
