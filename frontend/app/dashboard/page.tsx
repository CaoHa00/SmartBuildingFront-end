import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { EnergyChart } from "./_components/energy-chart";
import ActiveDevice from "./_components/active-device";
import HumidTempCo2 from "./_components/humid-temp-co2";
import AirConditioners from "./_components/air-con";
import DeviceManager from "./_components/device-manager";
import WifiTab from "./_components/wifi-tab";
import BluetoothTab from "./_components/bluetooth-tab";
import VoiceAssistant from "./_components/voice-assistant";
import AddNewDevice from "./_components/add-new-device";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar className="p-2 rounded-3xl" />
      <SidebarInset className="bg-sky-300">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 font-bold text-xl text-blue-800">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 w-5 h-5" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <img
              src="/icon/logo-15yrs.svg"
              alt="EIU Logo"
              width={120}
              height={120}
            />
            <h2 className="text-xl font-bold">Smart Building </h2>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-4 md:grid-cols-3">
            <ActiveDevice />
            <div className="col-span-2 flex-1 aspect-auto rounded-xl bg-muted/50 md:min-h-min bg-sky-300 shadow-xl">
              <EnergyChart />
            </div>
            <HumidTempCo2 />
            <AirConditioners />
            <DeviceManager />
            <div className="row-span-1 grid auto-rows-min gap-4 md:grid-cols-2">
              <WifiTab />
              <BluetoothTab />
              <VoiceAssistant />
            </div>
            <AddNewDevice />
            {/* <div className="row-span-1 rounded-xl bg-muted/50"></div>
            <div></div> */}
          </div>
        </div>
        {/* <img src="/img/UI-02.png" alt="" /> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
