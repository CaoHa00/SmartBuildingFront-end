import TopBar from "./components/top-bar";
import NoiseDetect from "./components/noise-detect";
import AirQuality from "./components/air-quality";
import ElectricityUsage from "./components/electricity-usage";
import EnergyComponent from "./components/energy-component";
import { LanguageProvider } from "@/components/providers/language-provider";
import BorderLines from "./components/border-lines";
import GetRealWeather from "./components/get-real-weather";
import CarbonEmission from "./components/carbon-emission";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen">
        <BorderLines />
        <TopBar />
        {/* <section className="relative h-full flex justify-center bg-[url(/img/BG.svg)]"> */}
        {/* <section className="relative h-full flex justify-center bg-[url(/img/BGSpring.svg)]"> */}
        <section className="relative h-full flex justify-center bg-gradient-to-b from-[#080077] via-[#65aff1] to-[#650bf7]">
          <div className="container mx-auto px-6 pb-3 text-white">
            <GetRealWeather />
            <div className="grid bg-[#0f4da8] p-2 rounded-xl grid-cols-2 gap-2 mb-2">
              <NoiseDetect />
              <AirQuality />
            </div>
            <div className="grid bg-[#0f4da8] p-2 rounded-xl grid-cols-2 gap-2 mb-2">
              <ElectricityUsage />
              <CarbonEmission />
            </div>
            <div className="bg-[#0f4da8] p-2 rounded-xl mb-1">
              <EnergyComponent />
            </div>
          </div>
        </section>
      </div>
    </LanguageProvider>
  );
}
