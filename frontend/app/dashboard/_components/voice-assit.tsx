"use client";
import { CirclePlus } from "lucide-react";
import { SiriWave } from "./siri-wave";

const VoiceAssit = () => {
  return (
    <div className="col-span-2 aspect-[8/3] rounded-xl bg-blue-700 overflow-hidden relative group">
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
      <div className="h-12 mx-4">
        <SiriWave />
      </div>
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-xl font-medium">
          How can I help you?
        </span>
      </div>
    </div>
  );
};

export default VoiceAssit;
