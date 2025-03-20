import ActiveDeviceRoom from "./active-device-room";

const rooms = [];

export default function ActiveDevice() {
  return (
    <div className="rounded-xl bg-muted/50 w-full col-span-2 md:col-span-1 shadow-xl">
      <div className="ml-3 pt-3">
        <h2 className="font-bold tracking-wide text-base text-blue-800 leading-none">
          Active Device
        </h2>
        <p className="tracking-widest text-blue-700 text-[10px] font-thin">
          Track active devices for connectivity
        </p>
      </div>
      <ActiveDeviceRoom />
      {/* <div className="bg-blue-700 rounded-xl aspect-auto m-3 p-3">
        <div className="flex text-white">
          <LayoutDashboard fill="white" size={28} />
          <p className="text-xl ml-1">Room 104</p>
        </div>
      </div>
      <div className="bg-blue-700 rounded-xl aspect-auto m-3 p-3">
        <div className="flex text-white">
          <LayoutDashboard fill="white" size={28} />
          <p className="text-xl ml-1">Room 107</p>
        </div>
      </div>
      <div className="bg-blue-700 rounded-xl aspect-auto m-3 p-3">
        <div className="flex text-white">
          <LayoutDashboard fill="white" size={28} />
          <p className="text-xl ml-1">Room 108</p>
        </div>
      </div> */}
    </div>
  );
}
