import TopBar from "./components/top-bar";
import WeatherComponent from "./components/weather-suggestions";
import GaugesComponents from "./components/gauges";
import NoiseDetect from "./components/noise-detect";
import AirQuality from "./components/air-quality";
import ElectricityUsage from "./components/electricity-usage";
import WaterUsage from "./components/water-usage";
import EnergyComponent from "./components/energy-component";
import { LanguageProvider } from "@/components/providers/language-provider";
import BorderLines from "./components/border-lines";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen">
        <BorderLines />
        <TopBar />
        <section className="relative h-full flex justify-center bg-gradient-to-b from-blue-900 via-blue-400 to-violet-700">
          <div className="container mx-auto px-6 text-white">
            <div className="grid mt-[80px] md:mt-24 grid-cols-2 gap-2 mb-2">
              <WeatherComponent />
              <GaugesComponents />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <NoiseDetect />
              <AirQuality />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ElectricityUsage />
              <WaterUsage />
            </div>
            <EnergyComponent />
          </div>
        </section>
      </div>
    </LanguageProvider>
  );
}
