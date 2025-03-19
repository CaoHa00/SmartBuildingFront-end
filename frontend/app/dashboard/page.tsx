import { AppSidebar } from "./_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  AirVent,
  Bluetooth,
  CircleMinus,
  CirclePlus,
  Droplet,
  LayoutDashboard,
  Snowflake,
  TriangleAlert,
  Waves,
  Wifi,
  Wind,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

import { EnergyChart } from "./_components/energy-chart";

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
            <div className="aspect-[16/17] rounded-xl bg-muted/50">
              <div className="ml-3 pt-3">
                <h2 className="font-boldz` tracking-wide text-base text-blue-800 leading-none">
                  Active Device
                </h2>
                <p className="tracking-widest text-blue-700 text-[10px] font-thin">
                  Track active devices for connectivity
                </p>
              </div>
              <div className="bg-blue-700 rounded-xl aspect-[16/15] m-3 p-3">
                <div className="flex text-white">
                  <LayoutDashboard fill="white" size={28} />
                  <p className="text-xl ml-1">Room 104</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex-1 rounded-xl bg-muted/50 md:min-h-min bg-sky-300">
              <EnergyChart />
            </div>
            <div className="aspect-video relative rounded-xl bg-muted/50">
              <div className="h-1/4 relative rounded-xl columns-2 bg-gradient-to-r from-blue-600 to-sky-300 mx-2 my-2">
                <div className="italic tracking-widest text-xs font-semibold text-left text-white p-1 ml-2">
                  Humidity
                </div>
                <div className="text-3xl text-center pb-1 absolute inset-x-0 text-white bottom-0 standee:text-4xl">
                  15 - 24 %
                </div>
                <div className="absolute top-0 right-0 p-1 text-white">
                  <Droplet />
                </div>
              </div>
              <div className="h-1/4 relative rounded-xl columns-2 bg-gradient-to-r from-blue-600 to-sky-300 mx-2 my-2">
                <div className="italic tracking-widest text-xs font-semibold text-left text-white p-1 ml-2">
                  Temperature
                </div>
                <div className="text-3xl text-center pb-1 absolute inset-x-0 text-white bottom-0 standee:text-4xl">
                  26°C
                </div>
                <div className="absolute top-0 right-0 p-1 text-white">
                  <Waves />
                </div>
              </div>
              <div className="h-1/3 relative rounded-xl bg-gradient-to-r from-blue-600 to-sky-300 mx-2 my-2">
                <div className="text-2xl text-center inset-0 text-white standee:text-3xl standee:pt-3">
                  700-1000 PPM
                </div>
                <div className="text-2xl text-center flex justify-between p-1 text-white standee:text-3xl standee:pt-6">
                  <p className="pl-2 standee:pt-3">CO</p>
                  <div className="text-white">
                    <TriangleAlert
                      size={30}
                      className="standee:w-12 standee:h-12"
                    />
                  </div>
                  <p className="pr-2 standee:pt-3">CO₂</p>
                </div>
              </div>
            </div>
            <div className="aspect-video relative rounded-xl bg-blue-700">
              <div className="absolute top-0 left-0 p-2 m-3 rounded-full bg-white">
                <AirVent color="blue" />
              </div>
              <div className="ml-16 pt-2">
                <h2 className="font-bold tracking-wide text-xl text-white">
                  AIR CONDITIONERS
                </h2>
                <p className="tracking-widest text-sky-100 text-xs font-thin">
                  Auto Cooling
                </p>
              </div>
              <div className="text-3xl text-center mt-8 mb-2 text-white standee:my-16 standee:py-10 standee:text-5xl">
                26°C
              </div>
              <div className="columns-5 flex justify-evenly content-evenly p-3">
                <div className="max-w-6 max-h-6 text-center mt-4 text-white">
                  <CircleMinus />
                </div>
                <div className="max-w-10 max-h-10 p-2 rounded-full bg-sky-300 mt-2 text-white">
                  <Wind />
                </div>
                <div className="max-w-14 p-3 rounded-full bg-blue-900 text-white">
                  <Snowflake size={32} />
                </div>
                <div className="max-w-10 max-h-10 p-2 rounded-full bg-sky-300 mt-2 text-white">
                  <Droplet />
                </div>
                <div className="max-w-6 max-h-6 text-center mt-4 text-white">
                  <CirclePlus />
                </div>
              </div>
            </div>
            <div className="row-span-2 rounded-xl bg-muted/50">
              <div className="text-2xl text-blue-800 p-3 font-bold">
                DEVICE MANAGER
              </div>
              <div className="border-8 rounded-3xl border-blue-800 m-2">
                <img
                  src="/icon/logo-15yrs.svg"
                  className="img-fluid border-8 rounded-2xl border-sky-300 p-2"
                />
              </div>
            </div>
            <div className="row-span-1 grid auto-rows-min gap-4 md:grid-cols-2">
              <div className="aspect-[8/3] rounded-xl bg-muted/50">
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
                  <div className="flex justify-between pr-2 pl-0 pt-3">
                    <div className="text-[10px] text-blue-800 italic my-auto">
                      EIU FACULTY/STAFF
                    </div>
                    <Switch className="data-[state=checked]:bg-blue-700 data-[state=unchecked]:bg-sky-400" />
                  </div>
                </div>
              </div>
              <div className="aspect-[8/3] rounded-xl bg-muted/50">
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
                  <div className="flex justify-between pr-2 pl-0 pt-3">
                    <div className="text-[10px] text-blue-800 italic my-auto">
                      JBL GO PRO 4
                    </div>
                    <Switch className="data-[state=checked]:bg-blue-700 data-[state=unchecked]:bg-sky-400" />
                  </div>
                </div>
              </div>
              <div className="col-span-2 aspect-[8/3] rounded-xl bg-blue-700">
                <div className="flex justify-between text-white">
                  <div className="ml-5 pt-3">
                    <h2 className="font-bold tracking-wide text-base text-white leading-none">
                      VOICE ASSISTANT
                    </h2>
                    <p className="tracking-widest text-sky-100 text-[10px] font-thin">
                      VOICE CONTROL THE SMART BUILDING
                    </p>
                  </div>
                  <CirclePlus size={20} className="m-3" />
                </div>
              </div>
            </div>
            <div className="aspect-[64/39] text-white rounded-xl bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-900 to-blue-700 border border-dashed">
              <CirclePlus size={32} className="mx-auto my-8 " />
              <div className="text-center tracking-widest text-2xl leading-[1.2] mb-8">
                ADD NEW DEVICE FROM DASHBOARD
              </div>
              <div className="text-center tracking-widest text-xl font-semibold">
                Night Light Mode
              </div>
            </div>
            <div className="row-span-1 rounded-xl bg-muted/50"></div>
            <div></div>
          </div>
        </div>
        {/* <img src="/img/UI-02.png" alt="" /> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
