import { CirclePlus } from "lucide-react";

export default function AddNewDevice() {
  return (
    <div className="aspect-auto text-white rounded-xl shadow-xl bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-900 to-blue-700 border border-dashed">
      <div className="mx-auto text-center">
        <button className="my-7 w-12 h-12 p-2 rounded-full text-center mt-3 text-white hover:bg-white hover:text-blue-700">
          <CirclePlus size={32} />
        </button>
      </div>
      <div className="text-center tracking-widest text-2xl leading-[1.2] mb-8">
        ADD NEW DEVICE FROM DASHBOARD
      </div>
      <div className="text-center tracking-widest text-xl font-semibold pb-3">
        Night Light Mode
      </div>
    </div>
  );
}
