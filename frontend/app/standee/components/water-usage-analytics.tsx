import { Droplet, MoveUp, Receipt } from "lucide-react";

export default function WaterUsageAnalytics() {
  return (
    <div className="bg-muted/40 flex rounded-xl aspect-auto px-2 md:px-5 py-3 mb-2">
      <div className="w-1/2 relative flex border-r border-white">
        <Droplet fill="white" className="h-12" />
        <div className="ml-3 pt-1">
          <p className="text-sm md:text-xl">Week Usage</p>
          <p className="text-sm md:text-xl">
            <span className="font-bold">25,5</span> KwH
          </p>
        </div>
        <div className="absolute right-0 p-1 md:p-3">
          <MoveUp size={18} className="h-12" color="red" />
        </div>
      </div>
      <div className="w-1/2 relative flex pl-2 md:pl-5">
        <Receipt className="h-12" />
        <div className="ml-3 pt-1">
          <p className="text-sm md:text-xl">Efficiency</p>
          <p className="text-sm md:text-xl">
            <span className="font-bold">43,5</span> %
          </p>
        </div>
        <div className="absolute right-0 p-1 md:p-3">
          <MoveUp size={18} className="h-12" color="#02f506" />
        </div>
      </div>
    </div>
  );
}
