
import React from "react";
import { Laptop, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Maximize, Minimize, Camera, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { DronePosition } from "@/types/drone";

interface DroneControlsProps {
  isDroneOn: boolean;
  speed: number;
  setSpeed: (value: number) => void;
  moveDrone: (direction: "up" | "down" | "left" | "right") => void;
  changeAltitude: (change: number) => void;
  captureDronePhoto: () => void;
  toggleDroneRecording: () => void;
  batteryLevel: number;
  isCharging: boolean;
  toggleCharging: () => void;
}

export const DroneControls: React.FC<DroneControlsProps> = ({
  isDroneOn,
  speed,
  setSpeed,
  moveDrone,
  changeAltitude,
  captureDronePhoto,
  toggleDroneRecording,
  batteryLevel,
  isCharging,
  toggleCharging
}) => {
  return (
    <Card className="lg:w-72 bg-black/30 backdrop-blur-md border-white/10">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">Drone Controls</h3>
        
        {/* Speed Control */}
        <div className="mt-4">
          <label className="text-xs text-white/70 block mb-2">Speed Control</label>
          <div className="flex items-center">
            <span className="text-white text-xs mr-2">Slow</span>
            <Slider 
              value={[speed]} 
              min={1} 
              max={10} 
              step={1} 
              onValueChange={(value) => setSpeed(value[0])}
              className="flex-1"
            />
            <span className="text-white text-xs ml-2">Fast</span>
          </div>
          <div className="mt-1 text-center text-xs text-white/70">Speed: {speed}</div>
        </div>
        
        {/* Movement Controls */}
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/10 border-white/20 hover:bg-white/20" 
              onClick={() => moveDrone("up")}
              disabled={!isDroneOn || isCharging}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <div></div>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/10 border-white/20 hover:bg-white/20" 
              onClick={() => moveDrone("left")}
              disabled={!isDroneOn || isCharging}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center justify-center">
              <Laptop className="h-5 w-5 text-white/70" />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/10 border-white/20 hover:bg-white/20" 
              onClick={() => moveDrone("right")}
              disabled={!isDroneOn || isCharging}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            <div></div>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/10 border-white/20 hover:bg-white/20" 
              onClick={() => moveDrone("down")}
              disabled={!isDroneOn || isCharging}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            <div></div>
          </div>
        </div>
        
        {/* Altitude Controls */}
        <div className="mt-6 flex gap-2">
          <Button 
            className="flex-1 bg-white/10 hover:bg-white/20 border-white/20"
            variant="outline"
            onClick={() => changeAltitude(-5)}
            disabled={!isDroneOn || isCharging}
          >
            <Minimize className="h-4 w-4 mr-1" /> Descend
          </Button>
          <Button 
            className="flex-1 bg-white/10 hover:bg-white/20 border-white/20"
            variant="outline"
            onClick={() => changeAltitude(5)}
            disabled={!isDroneOn || isCharging}
          >
            <Maximize className="h-4 w-4 mr-1" /> Ascend
          </Button>
        </div>
        
        {/* Camera Controls */}
        <div className="mt-6 flex gap-2">
          <Button 
            className="flex-1 bg-white/10 hover:bg-white/20 border-white/20"
            variant="outline"
            onClick={captureDronePhoto}
            disabled={!isDroneOn || isCharging}
          >
            <Camera className="h-4 w-4 mr-1" /> Take Photo
          </Button>
          <Button 
            className="flex-1 bg-white/10 hover:bg-white/20 border-white/20"
            variant="outline"
            onClick={toggleDroneRecording}
            disabled={!isDroneOn || isCharging}
          >
            <Video className="h-4 w-4 mr-1" /> Record
          </Button>
        </div>

        {/* Battery & Charging */}
        <div className="mt-6">
          <Button 
            className={`w-full ${
              isCharging 
                ? "bg-green-500/30 hover:bg-green-500/50 text-white border-green-500/50" 
                : "bg-white/10 hover:bg-white/20 border-white/20"
            }`}
            variant="outline"
            onClick={toggleCharging}
            disabled={!isDroneOn || batteryLevel >= 100}
          >
            {isCharging ? "Stop Charging" : "Charge Drone"}
          </Button>
          
          {/* Battery indicator */}
          <div className="mt-3 w-full h-3 bg-black/30 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                batteryLevel > 50 ? "bg-green-500" : 
                batteryLevel > 20 ? "bg-yellow-500" : "bg-red-500"
              } ${isCharging ? "animate-pulse" : ""}`}
              style={{ width: `${batteryLevel}%` }}
            ></div>
          </div>
          <div className="text-center text-xs mt-1 text-white/70">
            Battery: {batteryLevel}%
            {batteryLevel <= 20 && !isCharging && (
              <span className="text-red-400 ml-2 animate-pulse">Low!</span>
            )}
          </div>
        </div>
        
        {/* Status */}
        <div className="mt-4 p-2 rounded bg-black/20 text-xs text-white/70">
          <div>Status: {isDroneOn ? (isCharging ? "Charging" : "Active") : "Inactive"}</div>
          <div>Signal: Strong</div>
        </div>
      </div>
    </Card>
  );
};
