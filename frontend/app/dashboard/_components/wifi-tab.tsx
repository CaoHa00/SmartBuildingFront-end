import { Wifi } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function WifiTab() {
  return (
    <div className="aspect-auto rounded-xl bg-muted/50 max-w-40 shadow-xl">
      <div className="relative ml-3 pt-2">
        <h2 className="tracking-wide text-sm text-blue-800 leading-none">
          Wifi
        </h2>
        <p className="tracking-widest text-sky-500 italic text-[8px] font-thin leading-none">
          4 Device
        </p>
        <div className="absolute top-0 right-0 p-2 text-blue-800">
          <Wifi size={16} />
        </div>
        <div className="flex justify-between pr-2 pl-0 pt-3 pb-2">
          <div className="text-[10px] text-blue-800 italic my-auto">
            EIU FACULTY/STAFF
          </div>
          <Switch className="data-[state=checked]:bg-blue-700 data-[state=unchecked]:bg-sky-300" />
        </div>
      </div>
    </div>
  );
}
