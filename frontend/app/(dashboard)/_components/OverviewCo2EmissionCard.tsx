import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useTotalElectricalReading from "@/hooks/use-total-electrical-reading";

export default function OverviewCo2EmissionCard() {
  const totalReading = useTotalElectricalReading();

  const CalculateCarbonFootprint = (electricity: number) => {
    return Math.round(((electricity * 0.8) / 1000) * 100) / 100;
  };

  const co2Emission = CalculateCarbonFootprint(
    totalReading.maxReading ? totalReading.maxReading.cumulativeEnergy : 0
  );

  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-xl card-foreground">
            <div className="flex justify-between">
              <span>CO2 EMISSION</span>
              <div className="pt-1">
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h8M8 14h8M8 18h8M8 6h8M5 6h.01M5 10h.01M5 14h.01M5 18h.01M21 12c0 4.418-3.582 8-8 8H9.414l-4.707 4.707A1 1 0 014 22V2a1 1 0 011.707-.707L9.414 6H13c4.418 0 8 3.582 8 8z"
                  />
                </svg>
              </div>
            </div>
          </CardTitle>
          <CardDescription>Total Emission</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="">
            <span className="text-[70px] text-[#00FFFF] font-semibold">
              {co2Emission}
            </span>
            <div className="text-3xl">tCO₂</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
