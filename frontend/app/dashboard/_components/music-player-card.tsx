"use client";

import {
  Shuffle,
  Repeat,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function MusicPlayerCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(30);

  return (
    <Card className="w-full h-full rounded-2xl">
      <CardContent className="p-4 bg-blue-400 rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <h2 className="text-xl font-bold text-white">JBL GO PRO 4</h2>
            <h3 className="text-sm font-normal text-white">Now Playing</h3>
            <p className="text-sm text-white">Don't worry be happy - Artist</p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-slate-200 rounded-full">
            <Slider
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>

          {/* Main controls */}
          <div className="flex items-center justify-center gap-4 w-full">
            <button
              className={`p-2 rounded-full hover:bg-blue-700 ${
                isShuffle ? "text-blue-800" : ""
              }`}
              onClick={() => setIsShuffle(!isShuffle)}
            >
              <Shuffle className="text-white" size={15} />
            </button>
            <button className="p-2 rounded-full hover:bg-blue-700">
              <SkipBack className="text-white" size={15} />
            </button>
            <button
              className="p-3 bg-blue-800 rounded-full hover:bg-blue-700 text-white"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-blue-700">
              <SkipForward className="text-white" size={15} />
            </button>
            <button
              className={`p-2 rounded-full hover:bg-blue-700 ${
                isRepeat ? "text-blue-800" : ""
              }`}
              onClick={() => setIsRepeat(!isRepeat)}
            >
              <Repeat className="text-white" size={15} />
            </button>
            {/* Volume controls */}
            {/* <div className="flex items-center gap-2 w-full max-w-[100px]">
              <button
                className="p-2 rounded-full hover:bg-blue-100 text-white"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <Slider
                value={[isMuted ? 0 : volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
