import TopBar from "./_components/top-bar";
import NoiseDetect from "./_components/noise-detect";
import AirQuality from "./_components/air-quality";
import ElectricityUsage from "./_components/electricity-usage";
import CarbonEmission from "./_components/carbon-emission";
import EnergyComponent from "./_components/energy-component";
import BorderLines from "./_components/border-lines";
import GetRealWeather from "./_components/get-real-weather";
import { Footer } from "@/components/ui/footer";

export default function StandeeDashboard() {
  return (
    <div className="relative min-h-screen">
      <BorderLines />
      <TopBar />
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
      <Footer variant="standee" />
    </div>
  );
}
