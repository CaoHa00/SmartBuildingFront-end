import { useIsMobile } from "@/hooks/use-mobile";

export default function DeviceManager() {
  const isMobile = useIsMobile();

  return (
    <div className="rounded-xl bg-muted/50 shadow-xl p-4">
      <div className="ml-3">
        <h2 className="flex font-bold tracking-wide text-xl text-blue-800 leading-none">
          DEVICE MANAGER
        </h2>
        <p className="tracking-widest text-blue-700 text-xs font-thin leading-none">
          Monitor and manage your devices
        </p>
      </div>
      <div className="bg-blue-800 text-white p-4 rounded-xl mt-4">
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
        </div>
      </div>
    </div>
  );
}
