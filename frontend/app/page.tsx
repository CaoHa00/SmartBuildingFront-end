import TopBar from "./components/top-bar";
// import WeatherComponent from "./components/weather-suggestions";
// import GaugesComponents from "./components/gauges";
import NoiseDetect from "./components/noise-detect";
import AirQuality from "./components/air-quality";
import ElectricityUsage from "./components/electricity-usage";
import WaterUsage from "./components/water-usage";
import EnergyComponent from "./components/energy-component";
import { LanguageProvider } from "@/components/providers/language-provider";
import BorderLines from "./components/border-lines";
import GetRealWeather from "./components/get-real-weather";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen">
        <BorderLines />
        <TopBar />
        <section className="relative h-full flex justify-center bg-[url(/img/BG.svg)]">
          <div className="container mx-auto px-6 text-white">
            {/* <div className="grid mt-[80px] md:mt-24 grid-cols-2 gap-2 mb-2">
              <WeatherComponent />
              <GaugesComponents />
            </div> */}
            <GetRealWeather />
            <div className="grid bg-[#0f4da8] p-2 rounded-xl grid-cols-2 gap-2 mb-2">
              <NoiseDetect />
              <AirQuality />
            </div>
            <div className="grid bg-[#0f4da8] p-2 rounded-xl grid-cols-2 gap-2 mb-2">
              <ElectricityUsage />
              <WaterUsage />
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
