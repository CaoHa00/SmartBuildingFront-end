import { LayoutDashboard } from "lucide-react";

export default function ActiveDeviceRoom() {
  return (
    <div className="bg-blue-700 rounded-xl aspect-auto m-3 p-3">
      <div className="flex text-white">
        <LayoutDashboard fill="white" size={28} />
        <p className="text-xl ml-1">Room 103</p>
      </div>
    </div>
  );
}
