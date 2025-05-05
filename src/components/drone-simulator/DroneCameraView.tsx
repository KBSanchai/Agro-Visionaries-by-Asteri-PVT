
import React from "react";
import { Drone3DScene } from "./Drone3DScene";
import { DronePosition, DroneGameState } from "@/types/drone";

interface DroneCameraViewProps {
  dronePosition: DronePosition;
  gameState: DroneGameState;
  isDroneOn: boolean;
}

export const DroneCameraView: React.FC<DroneCameraViewProps> = ({ 
  dronePosition, 
  gameState,
  isDroneOn 
}) => {
  return (
    <div className="relative w-full h-[400px] bg-gray-900 overflow-hidden">
      {/* 3D Drone View */}
      <Drone3DScene 
        dronePosition={dronePosition}
        gameState={gameState}
        isDroneOn={isDroneOn}
      />
      
      {/* Drone camera overlay */}
      <div className="absolute inset-0 pointer-events-none border-4 border-black/80">
        <div className="absolute top-2 left-2 text-red-500 font-mono text-xs flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping mr-1"></div>
          REC
        </div>
        <div className="absolute top-2 right-2 text-white font-mono text-xs">
          ALT: {dronePosition.altitude}m
        </div>
        <div className="absolute bottom-2 left-2 text-white font-mono text-xs">
          {new Date().toLocaleTimeString()}
        </div>
        <div className="absolute bottom-2 right-2 text-white font-mono text-xs">
          X:{dronePosition.x.toFixed(1)} Y:{dronePosition.y.toFixed(1)}
        </div>
        
        {/* Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 border border-white/50 rounded-full"></div>
          <div className="absolute w-6 h-0.5 bg-white/50"></div>
          <div className="absolute w-0.5 h-6 bg-white/50"></div>
        </div>
        
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/70"></div>
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/70"></div>
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/70"></div>
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/70"></div>
      </div>
    </div>
  );
};
