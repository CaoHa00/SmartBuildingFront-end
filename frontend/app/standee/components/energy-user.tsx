import { Square } from "lucide-react";

export default function EnergyUser() {
  return (
    <div className="w-1/2">
      <div className="flex justify-between h-6 mb-5">
        <div className="">
          <p className="ml-3 md:text-2xl tracking-widest">Energy User</p>
          <div className="ml-2 flex">
            <div className="text-[8px] flex mr-4">
              <Square
                size={8}
                className="h-3 mr-1"
                fill="#55fbff"
                color="#55fbff"
              />
              Consumes
            </div>
            <div className="text-[8px] flex">
              <Square
                size={8}
                className="h-3 mr-1"
                fill="#0f4da8"
                color="#0f4da8"
              />
              Efficiency
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-muted/60 px-3 py-1 rounded-sm text-[10px] mr-2">
          Last Year
        </div>
      </div>
      <div className="h-56 bg-muted/60 mt-3 mr-2 rounded-xl"></div>
    </div>
  );
}
