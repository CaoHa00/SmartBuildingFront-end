import { useIsMobile } from "@/hooks/use-mobile";

export default function DeviceManager() {
  const isMobile = useIsMobile();
  
  return (
    <div className="row-span-2 rounded-xl bg-muted/50 shadow-xl p-4">
      <div className="text-2xl text-blue-800 font-bold mb-4">
        DEVICE MANAGER
      </div>
      <div className={`grid ${
        isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'
      }`}>
        <div className="bg-blue-800 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-neutral-200 mb-2">
            Scheduler
          </h3>
          <div className="space-y-2">
            <div className="bg-sky-300 p-2 rounded">
              <p>Next scheduled maintenance: Tomorrow 10:00 AM</p>
              <p>Active schedules: 5</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-800 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-neutral-200 mb-2">
            Active Devices
          </h3>
          <div className="space-y-2 text-neutral-200">
            <div className="flex justify-between bg-sky-300 p-2 rounded">
              <span>Total Devices:</span>
              <span className="font-bold">24</span>
            </div>
            <div className="flex justify-between bg-sky-300 p-2 rounded">
              <span>Online:</span>
              <span className="font-bold text-green-600">20</span>
            </div>
            <div className="flex justify-between bg-sky-300 p-2 rounded">
              <span>Offline:</span>
              <span className="font-bold text-red-600">4</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-blue-800 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold text-neutral-200 mb-2">
            Notifications
          </h3>
          <div className="space-y-2">
            <div className="bg-yellow-500 p-2 rounded border-l-4 border-yellow-400">
              <p className="text-sm">Maintenance required for Device #123</p>
            </div>
            <div className="bg-red-500 p-2 rounded border-l-4 border-red-400">
              <p className="text-sm">Device #456 is offline</p>
            </div>
            <div className="bg-green-500 p-2 rounded border-l-4 border-green-400">
              <p className="text-sm">Schedule updated for Device #789</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`border-8 rounded-3xl w-full border-blue-800 ${
        isMobile ? 'm-1' : 'm-2'
      }`}>
        <img
          src="/icon/logo-15yrs.svg"
          className="img-fluid border-8 rounded-2xl border-sky-300 p-2"
        />
      </div>
    </div>
  );
}
