"use client";

import { SuggestionRunner } from "./components/suggestions";
import TopBar from "./components/top-bar";
import WeatherComponent from "./components/weather";
import GaugesComponents from "./components/gauges";
import NoiseDetect from "./components/noise-detect";
import AirQuality from "./components/air-quality";
import ElectricityUsage from "./components/electricity-usage";
import WaterUsage from "./components/water-usage";
import EnergyComponent from "./components/energy-component";

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <section className="relative h-full flex justify-center bg-gradient-to-b from-blue-900 via-blue-400 to-violet-700">
        <div className="container mx-auto px-6 text-white">
          <SuggestionRunner />
          <div className="grid grid-cols-2 gap-2">
            <WeatherComponent />
            <GaugesComponents temperature={0} uvIndex={0} humidity={0} />
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
  );
}
