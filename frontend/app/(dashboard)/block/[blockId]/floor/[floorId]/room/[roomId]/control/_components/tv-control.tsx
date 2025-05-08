"use client";

import { useState } from "react";
import {
  Tv2,
  Power,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const TvControl = () => {
  const [power, setPower] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const [channel, setChannel] = useState(1);
  const [input, setInput] = useState("hdmi1");

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (isMuted && value[0] > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const changeChannel = (increment: number) => {
    setChannel((prev) => Math.max(1, prev + increment));
  };

  return (
    <Card className="rounded-xl border-2 bg-card text-card-foreground shadow dark:border-primary">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-card-foreground">TV CONTROL</h2>
          <p className="text-sm text-muted-foreground">Channel {channel}</p>
        </div>
        <div className="flex items-center gap-4">
          <Tv2 size={24} />
          <Switch
            checked={power}
            onCheckedChange={setPower}
            className="data-[state=checked]:bg-green-600"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {power && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="hover:bg-green-100 dark:hover:bg-green-900"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </Button>
                    <span className="min-w-[2rem] text-sm">
                      {isMuted ? 0 : volume}%
                    </span>
                  </div>
                </div>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-green-600 [&>[data-disabled]]:opacity-50 [&>.relative>::before]:bg-green-600 [&_.relative>div]:bg-green-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Input Source</label>
                <Select value={input} onValueChange={setInput}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tv">TV</SelectItem>
                    <SelectItem value="hdmi1">HDMI 1</SelectItem>
                    <SelectItem value="hdmi2">HDMI 2</SelectItem>
                    <SelectItem value="hdmi3">HDMI 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => changeChannel(1)}
                  className="h-12 w-12 rounded-full hover:bg-green-100 hover:text-green-600 hover:border-green-600"
                >
                  <ChevronUp size={24} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => changeChannel(-1)}
                  className="h-12 w-12 rounded-full hover:bg-green-100 hover:text-green-600 hover:border-green-600"
                  disabled={channel <= 1}
                >
                  <ChevronDown size={24} />
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TvControl;
