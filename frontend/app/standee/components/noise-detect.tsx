import { Ear, Square } from "lucide-react";

export default function NoiseDetect() {
  return (
    <div className="bg-muted/40 rounded-xl aspect-auto px-5 py-3 mb-2">
      <div className="flex justify-center text-2xl leading-none">
        <Ear />
        Noise Detect
      </div>
      <div className="w-full text-center mt-3 h-24 md:h-40">Gauge</div>
      <div className="flex justify-center">
        <div className="w-full flex">
          <div className="w-full">
            <div className="flex justify-center">
              <Ear size={12} className="h-5" />
              <p className="text-sm md:text-base font-bold px-1">Minimum</p>
              <Square
                size={10}
                className="h-5"
                fill="#02f506"
                color="#02f506"
              />
            </div>
            <p className="text-xs md:text-base font-bold text-center">
              32.0 dB
            </p>
          </div>
        </div>
        {/* <div className="w-full flex border-r border-white pr-2 pl-2">
                <div className="w-full">
                <div className="flex justify-center">
                    <Ear size={10} className="h-4" />
                    <p className="text-xs md:text-base font-bold px-1">
                    Average
                    </p>
                    <Square
                    size={8}
                    className="h-4"
                    fill="yellow"
                    color="yellow"
                    />
                </div>
                <p className="text-xs md:text-base font-bold text-center">
                    72.4 dB
                </p>
                </div>
            </div>
            <div className="w-full flex pl-2">
                <div className="w-full">
                <div className="flex justify-center">
                    <Ear size={10} className="h-4" />
                    <p className="text-xs md:text-base font-bold px-1">
                    Maximum
                    </p>
                    <Square size={8} className="h-4" fill="red" color="red" />
                </div>
                <p className="text-xs md:text-base font-bold text-center">
                    81.2 dB
                </p>
                </div>
            </div> */}
      </div>
    </div>
  );
}
