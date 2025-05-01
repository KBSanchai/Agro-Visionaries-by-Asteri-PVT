
import React from "react";
import { Card } from "@/components/ui/card";
import { Leaf, MapPin } from "lucide-react";
import { DronePosition, DroneGameState } from "@/types/drone";

interface DroneMissionDataProps {
  dronePosition: DronePosition;
  gameState: DroneGameState;
}

export const DroneMissionData: React.FC<DroneMissionDataProps> = ({
  dronePosition,
  gameState
}) => {
  return (
    <Card className="p-4 bg-black/30 backdrop-blur-md border-white/20">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white flex items-center gap-1">
            <MapPin className="h-4 w-4" /> Position Data
          </h3>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="text-white/70">X Coordinate:</div>
            <div className="text-white font-mono">{dronePosition.x.toFixed(1)}</div>
            
            <div className="text-white/70">Y Coordinate:</div>
            <div className="text-white font-mono">{dronePosition.y.toFixed(1)}</div>
            
            <div className="text-white/70">Altitude:</div>
            <div className="text-white font-mono">{dronePosition.altitude}m</div>
            
            <div className="text-white/70">Rotation:</div>
            <div className="text-white font-mono">{dronePosition.rotation}°</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-white flex items-center gap-1">
            <Leaf className="h-4 w-4" /> Mission Data
          </h3>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="text-white/70">Current Score:</div>
            <div className="text-white font-mono">{gameState.score}</div>
            
            <div className="text-white/70">Current Mission:</div>
            <div className="text-white font-mono">{gameState.mission}</div>
            
            <div className="text-white/70">Field Type:</div>
            <div className="text-white font-mono capitalize">{gameState.fieldType}</div>
            
            <div className="text-white/70">Battery:</div>
            <div className={`font-mono ${gameState.batteryLevel <= 20 ? 'text-red-400' : 'text-white'}`}>
              {gameState.batteryLevel.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
