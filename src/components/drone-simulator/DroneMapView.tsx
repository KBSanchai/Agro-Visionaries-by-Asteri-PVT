
import React from "react";
import { Compass, ArrowUp, Laptop } from "lucide-react";
import { DronePosition } from "@/types/drone";

interface DroneMapViewProps {
  dronePosition: DronePosition;
  isDroneOn: boolean;
  isCharging: boolean;
  fieldSize: { width: number; height: number };
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

export const DroneMapView: React.FC<DroneMapViewProps> = ({
  dronePosition,
  isDroneOn,
  isCharging,
  fieldSize,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
}) => {
  return (
    <div 
      className="relative w-full h-[400px] overflow-hidden bg-gradient-to-b from-green-900/30 to-green-800/30"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Map Grid */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index} className="border border-white/5"></div>
        ))}
      </div>
      
      {/* Field elements */}
      <div className="absolute top-[20%] left-[10%] w-[30%] h-[40%] bg-green-300/20 rounded-sm border border-green-300/30">
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50">Rice Field</div>
      </div>
      <div className="absolute top-[30%] left-[50%] w-[40%] h-[30%] bg-green-400/20 rounded-sm border border-green-400/30">
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50">Wheat Crops</div>
      </div>
      <div className="absolute top-[70%] left-[20%] w-[60%] h-[20%] bg-green-200/20 rounded-sm border border-green-200/30">
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50">Orchard</div>
      </div>
      <div className="absolute top-[10%] left-[80%] w-[15%] h-[15%] bg-blue-400/30 rounded-sm border border-blue-400/50">
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50">Reservoir</div>
      </div>
      
      {/* Charging station */}
      <div className="absolute bottom-[5%] right-[5%] w-[10%] h-[10%] bg-yellow-400/30 rounded-sm border border-yellow-400/50">
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/60">Charger</div>
      </div>
      
      {/* Drone */}
      {isDroneOn && (
        <div 
          className={`absolute w-5 h-5 transition-all duration-300 ease-out flex items-center justify-center ${
            isCharging ? "animate-pulse" : ""
          }`}
          style={{ 
            left: `calc(${dronePosition.x}% - 10px)`, 
            top: `calc(${dronePosition.y}% - 10px)`,
            transform: `rotate(${dronePosition.rotation}deg) scale(${1 + dronePosition.altitude / 200})`,
            filter: `drop-shadow(0 0 ${dronePosition.altitude / 10}px rgba(255,255,255,0.8))`
          }}
        >
          <Laptop className={`w-full h-full ${isCharging ? "text-yellow-300" : "text-white animate-pulse"}`} />
          
          {/* Drone shadow based on altitude */}
          <div 
            className="absolute rounded-full bg-black/50 blur-sm w-4 h-1"
            style={{
              bottom: `-${dronePosition.altitude / 5}px`,
              opacity: 1 - dronePosition.altitude / 150,
              transform: `scale(${dronePosition.altitude / 30})`
            }}
          ></div>

          {/* Charging animation */}
          {isCharging && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-yellow-300/70 animate-ping"></div>
              <div className="absolute w-8 h-8 rounded-full border border-yellow-200/50 animate-ping" style={{animationDelay: "0.3s"}}></div>
            </div>
          )}
        </div>
      )}
      
      {/* Altitude indicator */}
      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded flex items-center">
        <ArrowUp className="h-3 w-3 mr-1" />
        Altitude: {dronePosition.altitude}m
      </div>
      
      {/* Coordinates */}
      <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded flex items-center">
        <Compass className="h-3 w-3 mr-1" />
        Position: {dronePosition.x.toFixed(1)}, {dronePosition.y.toFixed(1)}
      </div>

      {/* Mission objective indicator (placeholder) */}
      <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded">
        Mission: Explore the farm
      </div>

      {/* Score (placeholder) */}
      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs p-2 rounded">
        Score: 0
      </div>
    </div>
  );
};
