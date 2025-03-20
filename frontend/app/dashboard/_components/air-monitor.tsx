import { Droplet, TriangleAlert, Waves } from "lucide-react";

export function AirMonitor() {
  return (
    <div className="aspect-video relative rounded-xl bg-muted/50 h-[430px] w-[510px]">
      <div className="h-1/3 relative rounded-xl columns-2 bg-gradient-to-r from-blue-600 to-sky-300 mx-2 my-2">
        <div className="italic tracking-widest text-xs font-bold text-left text-white p-1 ml-2">
          Humidity
        </div>
        <div className="text-3xl text-center pb-1 absolute inset-x-0 text-white bottom-0 standee:text-4xl">
          15 - 24 %
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Droplet />
        </div>
      </div>
      <div className="h-1/3 relative rounded-xl columns-2 bg-gradient-to-r from-blue-600 to-sky-300 mx-2 my-2">
        <div className="italic tracking-widest text-xs font-bold text-left text-white p-1 ml-2">
          Temperature
        </div>
        <div className="text-3xl text-center pb-1 absolute inset-x-0 text-white bottom-0 standee:text-4xl">
          26°C
        </div>
        <div className="absolute top-0 right-0 p-1 text-white">
          <Waves />
        </div>
      </div>
      <div className="h-1/4 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300 mx-2 my-2">
        <div className="text-2xl text-center inset-0 text-white standee:text-3xl standee:pt-3">
          700-1000 PPM
        </div>
        <div className="text-2xl text-center flex justify-between p-1 text-white standee:text-3xl standee:pt-6">
          <p className="pl-2 standee:pt-3">CO</p>
          <div className="text-white">
            <TriangleAlert size={30} className="standee:w-12 standee:h-12" />
          </div>
          <p className="pr-2 standee:pt-3">CO₂</p>
        </div>
      </div>
    </div>
  );
}
