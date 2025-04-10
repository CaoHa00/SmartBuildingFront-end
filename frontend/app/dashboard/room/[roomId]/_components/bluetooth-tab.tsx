import { Bluetooth } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function BluetoothTab() {
  return (
    <div className="flex-1 w-full rounded-xl bg-muted/50 shadow-xl">
      <div className="relative ml-3 pt-2">
        <h2 className="tracking-wide text-sm text-blue-800 leading-none">
          Bluetooth
        </h2>
        <p className="tracking-widest text-sky-500 italic text-[8px] font-thin leading-none">
          Device
        </p>
        <div className="absolute top-0 right-0 p-2 text-blue-800">
          <Bluetooth size={16} />
        </div>
        <div className="flex justify-between pr-2 pl-0 pt-3 pb-2">
          <div className="text-[10px] text-blue-800 italic my-auto">
            JBL GO PRO 4
          </div>
          <Switch className="data-[state=checked]:bg-blue-700 data-[state=unchecked]:bg-sky-300" />
        </div>
      </div>
    </div>
  );
}
