"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Monitor,
  Computer,
  Speaker,
  RockingChair,
  Square,
  Pin,
  Info,
  Layout,
  Book,
  Clock,
  User,
  GraduationCap,
} from "lucide-react";

const RoomInfo = () => {
  return (
    <Card className="w-full h-full bg-card text-neutral-100 shadow-xl">
      <CardHeader className="p-4 border-b border-blue-700/50">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold justify-between">
          Room Information
          <Pin className="text-yellow-400" />
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 py-3">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Room Specifications Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-semibold">Room Specifications</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 h-[250px] bg-blue-900/30 p-4 rounded-xl">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800/30 transition-colors">
                <Square className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-neutral-300">Area</p>
                  <p className="text-xs font-semibold">70 M²</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800/30 transition-colors">
                <RockingChair className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-neutral-300">Chairs</p>
                  <p className="text-xs font-semibold">40 Units</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800/30 transition-colors">
                <Square className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-neutral-300">Tables</p>
                  <p className="text-xs font-semibold">20 (Double)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800/30 transition-colors">
                <Speaker className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-neutral-300">Speakers</p>
                  <p className="text-xs font-semibold">4 Units</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800/30 transition-colors">
                <Monitor className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-neutral-300">Monitor</p>
                  <p className="text-xs font-semibold">LG 70 inch</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800/30 transition-colors">
                <Computer className="h-5 w-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-neutral-300">Computer</p>
                  <p className="text-xs font-semibold">1 Unit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lecture Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Book className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-semibold">
                Current Lecture Information
              </h3>
            </div>

            <div className="bg-blue-900/30 h-[250px] rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-800/30">
                  <User className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-neutral-300">Lecturer</p>
                    <p className="text-xs font-semibold">Mr. White</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-800/30">
                  <GraduationCap className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-neutral-300">Subject</p>
                    <p className="text-xs font-semibold">MATH 203</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-800/30 md:col-span-2">
                  <Clock className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-neutral-300">Schedule</p>
                    <p className="text-xs font-semibold">7:30 - 9:30</p>
                    <p className="text-xs text-neutral-300">
                      Monday, Wednesday
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-800/30 md:col-span-2">
                  <User className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="text-xs text-neutral-300">Students</p>
                    <p className="text-xs font-semibold">35 Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room Layout Section */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Layout className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-semibold">Room Layout</h3>
            </div>

            <div className="bg-blue-900/30 rounded-xl p-4 h-[250px]">
              <div className="w-full h-full border border-blue-400/30 rounded-lg flex items-center justify-center bg-blue-950/50 backdrop-blur-sm">
                <img
                  src="/icon/room.svg"
                  alt="Room Layout"
                  className="w-full h-full object-contain p-4 rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomInfo;
