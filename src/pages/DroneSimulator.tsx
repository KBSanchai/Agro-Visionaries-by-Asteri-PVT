
import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Map, Laptop } from "lucide-react";
import { toast } from "sonner";
import { DroneControls } from "@/components/drone-simulator/DroneControls";
import { DroneMapView } from "@/components/drone-simulator/DroneMapView";
import { DroneCameraView } from "@/components/drone-simulator/DroneCameraView";
import { DroneSimulatorTips } from "@/components/drone-simulator/DroneSimulatorTips";
import { DroneMissionData } from "@/components/drone-simulator/DroneMissionData";
import { DroneHelpDialog } from "@/components/drone-simulator/DroneHelpDialog";
import { DronePosition, DroneGameState } from "@/types/drone";

const DroneSimulator: React.FC = () => {
  // Drone state
  const [dronePosition, setDronePosition] = useState<DronePosition>({
    x: 50,
    y: 50,
    altitude: 30,
    rotation: 0
  });
  
  const [gameState, setGameState] = useState<DroneGameState>({
    score: 0,
    mission: "Explore the farm",
    batteryLevel: 100,
    isCharging: false,
    fieldType: "none"
  });

  const [isDroneOn, setIsDroneOn] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [activeView, setActiveView] = useState<"map" | "camera">("map");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const simulationRef = useRef<HTMLDivElement>(null);
  const [fieldSize, setFieldSize] = useState({ width: 800, height: 600 });
  const [dragging, setDragging] = useState(false);
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 });
  const batteryInterval = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize field size based on container dimensions
  useEffect(() => {
    if (simulationRef.current) {
      const { width, height } = simulationRef.current.getBoundingClientRect();
      setFieldSize({ width, height });
    }
  }, []);
  
  // Detect when drone is over different field types
  useEffect(() => {
    if (!isDroneOn) return;
    
    let newFieldType: DroneGameState["fieldType"] = "none";
    
    // Check Rice Field
    if (
      dronePosition.x >= 10 && 
      dronePosition.x <= 40 && 
      dronePosition.y >= 20 && 
      dronePosition.y <= 60
    ) {
      newFieldType = "rice";
    }
    // Check Wheat Crops
    else if (
      dronePosition.x >= 50 && 
      dronePosition.x <= 90 && 
      dronePosition.y >= 30 && 
      dronePosition.y <= 60
    ) {
      newFieldType = "wheat";
    }
    // Check Orchard
    else if (
      dronePosition.x >= 20 && 
      dronePosition.x <= 80 && 
      dronePosition.y >= 70 && 
      dronePosition.y <= 90
    ) {
      newFieldType = "orchard";
    }
    // Check Reservoir
    else if (
      dronePosition.x >= 80 && 
      dronePosition.x <= 95 && 
      dronePosition.y >= 10 && 
      dronePosition.y <= 25
    ) {
      newFieldType = "reservoir";
    }
    
    if (newFieldType !== gameState.fieldType) {
      setGameState(prev => ({ ...prev, fieldType: newFieldType }));
      
      if (newFieldType !== "none") {
        toast.info(`Entered ${newFieldType} area`);
      }
    }
  }, [dronePosition, isDroneOn, gameState.fieldType]);

  // Battery management
  useEffect(() => {
    if (!isDroneOn || gameState.isCharging) {
      if (batteryInterval.current) {
        window.clearInterval(batteryInterval.current);
        batteryInterval.current = null;
      }
      
      // If charging, start charging interval
      if (gameState.isCharging && gameState.batteryLevel < 100) {
        batteryInterval.current = window.setInterval(() => {
          setGameState(prev => ({
            ...prev,
            batteryLevel: Math.min(100, prev.batteryLevel + 1)
          }));
        }, 200);
      }
      return;
    }
    
    // Drain battery when drone is active
    batteryInterval.current = window.setInterval(() => {
      setGameState(prev => {
        const newLevel = prev.batteryLevel - 0.1;
        
        // Show low battery warnings
        if (newLevel <= 20 && newLevel > 19.9) {
          toast.warning("⚠️ Battery low! Find a charging station!");
        } else if (newLevel <= 10 && newLevel > 9.9) {
          toast.error("⚠️ Critical battery level! Drone will auto-land soon!");
        } else if (newLevel <= 0) {
          toast.error("Battery depleted! Drone powering off...");
          setIsDroneOn(false);
        }
        
        return {
          ...prev,
          batteryLevel: Math.max(0, newLevel)
        };
      });
    }, 200);
    
    return () => {
      if (batteryInterval.current) {
        window.clearInterval(batteryInterval.current);
      }
    };
  }, [isDroneOn, gameState.isCharging]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Power on/off the drone
  const toggleDronePower = () => {
    if (!isDroneOn) {
      if (gameState.batteryLevel <= 0) {
        toast.error("Cannot power on. Battery depleted!");
        return;
      }
      toast.success("Drone activated!");
      setIsDroneOn(true);
    } else {
      toast.info("Drone deactivated");
      setIsDroneOn(false);
      setGameState(prev => ({
        ...prev,
        isCharging: false
      }));
    }
  };

  // Handle drone movement
  const moveDrone = (direction: "up" | "down" | "left" | "right") => {
    if (!isDroneOn) {
      toast.error("Drone is not powered on!");
      return;
    }
    
    if (gameState.isCharging) {
      toast.warning("Drone cannot move while charging!");
      return;
    }

    setDronePosition(prev => {
      const newPosition = { ...prev };
      
      switch (direction) {
        case "up":
          newPosition.y = Math.max(0, prev.y - speed);
          newPosition.rotation = 0;
          break;
        case "down":
          newPosition.y = Math.min(100, prev.y + speed);
          newPosition.rotation = 180;
          break;
        case "left":
          newPosition.x = Math.max(0, prev.x - speed);
          newPosition.rotation = -90;
          break;
        case "right":
          newPosition.x = Math.min(100, prev.x + speed);
          newPosition.rotation = 90;
          break;
      }
      
      return newPosition;
    });
  };

  // Handle altitude changes
  const changeAltitude = (change: number) => {
    if (!isDroneOn) {
      toast.error("Drone is not powered on!");
      return;
    }
    
    if (gameState.isCharging) {
      toast.warning("Drone cannot change altitude while charging!");
      return;
    }

    setDronePosition(prev => ({
      ...prev,
      altitude: Math.max(10, Math.min(100, prev.altitude + change))
    }));
  };

  // Toggle charging state
  const toggleCharging = () => {
    if (!isDroneOn) {
      toast.error("Drone is not powered on!");
      return;
    }

    const isNearChargingStation = 
      dronePosition.x >= 80 && 
      dronePosition.x <= 100 && 
      dronePosition.y >= 85 && 
      dronePosition.y <= 100;

    if (!gameState.isCharging && !isNearChargingStation) {
      toast.error("Move to charging station in the bottom right corner!");
      return;
    }

    setGameState(prev => {
      const newState = { ...prev, isCharging: !prev.isCharging };
      
      if (newState.isCharging) {
        toast.success("Drone charging initiated!");
      } else {
        toast.info("Charging stopped");
      }
      
      return newState;
    });
  };

  // Handle touch events for mobile control
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isDroneOn || gameState.isCharging) return;
    
    if (e.touches.length === 1) {
      setDragging(true);
      setLastTouchPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging || !isDroneOn || gameState.isCharging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastTouchPosition.x;
    const deltaY = touch.clientY - lastTouchPosition.y;
    
    setDronePosition(prev => {
      const newX = Math.max(0, Math.min(100, prev.x + (deltaX / fieldSize.width) * 100));
      const newY = Math.max(0, Math.min(100, prev.y + (deltaY / fieldSize.height) * 100));
      
      // Calculate rotation based on movement direction
      let newRotation = prev.rotation;
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        newRotation = deltaX > 0 ? 90 : -90;
      } else {
        newRotation = deltaY > 0 ? 180 : 0;
      }
      
      return {
        ...prev,
        x: newX,
        y: newY,
        rotation: newRotation
      };
    });
    
    setLastTouchPosition({
      x: touch.clientX,
      y: touch.clientY
    });
  };

  const handleTouchEnd = () => {
    setDragging(false);
  };

  // Simulate a drone photo capture
  const captureDronePhoto = () => {
    if (!isDroneOn) {
      toast.error("Drone is not powered on!");
      return;
    }
    
    if (gameState.isCharging) {
      toast.warning("Cannot take photos while charging!");
      return;
    }
    
    toast.success("Drone photo captured!");
    
    // Add points if in a field area
    if (gameState.fieldType !== "none") {
      setGameState(prev => ({
        ...prev,
        score: prev.score + 10
      }));
      toast.success(`+10 points for ${gameState.fieldType} field photo!`);
    }
    
    // Consume some battery for taking a photo
    setGameState(prev => ({
      ...prev,
      batteryLevel: Math.max(0, prev.batteryLevel - 0.5)
    }));
  };

  // Start a drone recording
  const toggleDroneRecording = () => {
    if (!isDroneOn) {
      toast.error("Drone is not powered on!");
      return;
    }
    
    if (gameState.isCharging) {
      toast.warning("Cannot record while charging!");
      return;
    }
    
    toast.success("Drone recording started!");
    
    // Consume some battery for starting to record
    setGameState(prev => ({
      ...prev,
      batteryLevel: Math.max(0, prev.batteryLevel - 1)
    }));
  };

  return (
    <Layout backgroundType="drone-simulator">
      <div className="min-h-screen p-4" ref={containerRef}>
        <div className={`max-w-4xl mx-auto ${isFullscreen ? 'max-w-none' : ''}`}>
          {/* Header */}
          <div className={`mb-4 relative z-10 flex items-center justify-between ${isFullscreen ? 'p-2 bg-black/30 backdrop-blur-sm rounded-lg' : ''}`}>
            <div>
              <h1 className="text-2xl font-bold text-white">Virtual Drone Simulator</h1>
              <p className="text-white/70">Control your drone over virtual agricultural fields</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={toggleFullscreen}
                className="h-8 px-3 py-1 text-xs rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
              </button>
              <DroneHelpDialog />
            </div>
          </div>

          {/* Main Simulator Area */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Simulation View */}
            <Card className="flex-1 bg-black/20 backdrop-blur-md border-white/10 overflow-hidden">
              <Tabs defaultValue="map" className="w-full" onValueChange={(value) => setActiveView(value as "map" | "camera")}>
                <div className="flex items-center justify-between p-2 border-b border-white/10">
                  <TabsList className="bg-black/30">
                    <TabsTrigger value="map" className="data-[state=active]:bg-green-500/20">
                      <Map className="h-4 w-4 mr-1" />
                      Map View
                    </TabsTrigger>
                    <TabsTrigger value="camera" className="data-[state=active]:bg-green-500/20">
                      <Camera className="h-4 w-4 mr-1" />
                      Camera View
                    </TabsTrigger>
                  </TabsList>
                  
                  <div>
                    <button 
                      className={`h-8 px-3 py-1 text-xs rounded ${
                        isDroneOn 
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      } transition-colors`}
                      onClick={toggleDronePower}
                    >
                      {isDroneOn ? 'Drone Active' : 'Drone Off'}
                    </button>
                  </div>
                </div>
                
                <TabsContent value="map" className="m-0">
                  <div ref={simulationRef}>
                    <DroneMapView
                      dronePosition={dronePosition}
                      isDroneOn={isDroneOn}
                      isCharging={gameState.isCharging}
                      fieldSize={fieldSize}
                      handleTouchStart={handleTouchStart}
                      handleTouchMove={handleTouchMove}
                      handleTouchEnd={handleTouchEnd}
                      score={gameState.score}
                      fieldType={gameState.fieldType}
                      mission={gameState.mission}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="camera" className="m-0">
                  <DroneCameraView dronePosition={dronePosition} />
                </TabsContent>
              </Tabs>
              
              {/* Mission Data Tab */}
              <Tabs defaultValue="mission" className="w-full mt-2 px-2 pb-2">
                <TabsList className="bg-black/30 w-full">
                  <TabsTrigger value="mission" className="flex-1 data-[state=active]:bg-green-500/20">
                    Mission Data
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="mission" className="mt-2">
                  <DroneMissionData 
                    dronePosition={dronePosition} 
                    gameState={gameState} 
                  />
                </TabsContent>
              </Tabs>
            </Card>
            
            {/* Controls Panel */}
            <DroneControls
              isDroneOn={isDroneOn}
              speed={speed}
              setSpeed={setSpeed}
              moveDrone={moveDrone}
              changeAltitude={changeAltitude}
              captureDronePhoto={captureDronePhoto}
              toggleDroneRecording={toggleDroneRecording}
              batteryLevel={gameState.batteryLevel}
              isCharging={gameState.isCharging}
              toggleCharging={toggleCharging}
            />
          </div>

          {/* Tips (hidden in fullscreen mode) */}
          {!isFullscreen && (
            <div className="mt-4">
              <DroneSimulatorTips />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DroneSimulator;
