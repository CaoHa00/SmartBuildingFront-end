import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DrinkingWaterCard() {
  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">
            <div className="flex justify-between">
              <span>DRINKING WATER</span>
              <div className="pt-1">
                <svg
                  className="w-5 h-5 text-sky-600 dark:text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18M3 18h18M3 6h18M5 6h.01M5 10h.01M5 14h.01M5 18h.01M21 12c0 4.418-3.582 8-8 8H9.414l-4.707 4.707A1 1 0 014 22V2a1 1 0 011.707-.707L9.414 6H13c4.418 0 8 3.582 8 8z"
                  />
                </svg>
              </div>
            </div>
          </CardTitle>
          <CardDescription>BLOCK 8</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="">
            <span className="text-[70px] text-[#00FFFF] font-semibold">
              0.146
            </span>
            <div className="text-3xl">m³</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
