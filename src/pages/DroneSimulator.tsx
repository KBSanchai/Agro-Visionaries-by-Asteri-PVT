import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Laptop, Camera, Maximize, Minimize, Video, Map } from "lucide-react";
import { toast } from "sonner";

// Drone position type
type DronePosition = {
  x: number;
  y: number;
  altitude: number;
  rotation: number;
};

const DroneSimulator: React.FC = () => {
  // Drone state
  const [dronePosition, setDronePosition] = useState<DronePosition>({
    x: 50,
    y: 50,
    altitude: 30,
    rotation: 0
  });
  const [isDroneOn, setIsDroneOn] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [activeView, setActiveView] = useState<"map" | "camera">("map");
  const simulationRef = useRef<HTMLDivElement>(null);
  const [fieldSize, setFieldSize] = useState({ width: 800, height: 600 });
  const [dragging, setDragging] = useState(false);
  const [lastTouchPosition, setLastTouchPosition] = useState({ x: 0, y: 0 });

  // Initialize field size based on container dimensions
  useEffect(() => {
    if (simulationRef.current) {
      const { width, height } = simulationRef.current.getBoundingClientRect();
      setFieldSize({ width, height });
    }
  }, []);

  // Power on/off the drone
  const toggleDronePower = () => {
    if (!isDroneOn) {
      toast.success("Drone activated!");
      setIsDroneOn(true);
    } else {
      toast.info("Drone deactivated");
      setIsDroneOn(false);
    }
  };

  // Handle drone movement
  const moveDrone = (direction: "up" | "down" | "left" | "right") => {
    if (!isDroneOn) {
      toast.error("Drone is not powered on!");
      return;
    }

    setDronePosition(prev => {
      const newPosition = { ...prev };
      
      switch (direction) {
        case "up":
          newPosition.y = Math.max(0, prev.y - speed);
          break;
        case "down":
          newPosition.y = Math.min(100, prev.y + speed);
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

    setDronePosition(prev => ({
      ...prev,
      altitude: Math.max(10, Math.min(100, prev.altitude + change))
    }));
  };

  // Handle touch events for mobile control
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isDroneOn) return;
    if (e.touches.length === 1) {
      setDragging(true);
      setLastTouchPosition({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging || !isDroneOn) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastTouchPosition.x;
    const deltaY = touch.clientY - lastTouchPosition.y;
    
    setDronePosition(prev => ({
      ...prev,
      x: Math.max(0, Math.min(100, prev.x + (deltaX / fieldSize.width) * 100)),
      y: Math.max(0, Math.min(100, prev.y + (deltaY / fieldSize.height) * 100)),
      rotation: deltaX > 0 ? 90 : deltaX < 0 ? -90 : prev.rotation
    }));
    
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
    toast.success("Drone photo captured!");
  };

  // Start a drone recording
  const toggleDroneRecording = () => {
    if (!isDroneOn) {
      toast.error("Drone is not powered on!");
      return;
    }
    toast.success("Drone recording started!");
  };

  return (
    <Layout backgroundType="drone-simulator">
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-4 relative z-10">
            <h1 className="text-2xl font-bold text-white">Virtual Drone Simulator</h1>
            <p className="text-white/70">Control your drone over virtual agricultural fields</p>
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
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={`h-8 text-xs ${isDroneOn ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}
                      onClick={toggleDronePower}
                    >
                      {isDroneOn ? 'Drone Active' : 'Drone Off'}
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="map" className="m-0">
                  <div 
                    ref={simulationRef}
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
                    <div className="absolute top-[20%] left-[10%] w-[30%] h-[40%] bg-green-300/20 rounded-sm border border-green-300/30"></div>
                    <div className="absolute top-[30%] left-[50%] w-[40%] h-[30%] bg-green-400/20 rounded-sm border border-green-400/30"></div>
                    <div className="absolute top-[70%] left-[20%] w-[60%] h-[20%] bg-green-200/20 rounded-sm border border-green-200/30"></div>
                    
                    {/* Drone */}
                    {isDroneOn && (
                      <div 
                        className="absolute w-5 h-5 transition-all duration-300 ease-out flex items-center justify-center"
                        style={{ 
                          left: `calc(${dronePosition.x}% - 10px)`, 
                          top: `calc(${dronePosition.y}% - 10px)`,
                          transform: `rotate(${dronePosition.rotation}deg) scale(${1 + dronePosition.altitude / 200})`,
                          filter: `drop-shadow(0 0 ${dronePosition.altitude / 10}px rgba(255,255,255,0.8))`
                        }}
                      >
                        <Laptop className="text-white w-full h-full animate-pulse" />
                        
                        {/* Drone shadow based on altitude */}
                        <div 
                          className="absolute rounded-full bg-black/50 blur-sm w-4 h-1"
                          style={{
                            bottom: `-${dronePosition.altitude / 5}px`,
                            opacity: 1 - dronePosition.altitude / 150,
                            transform: `scale(${dronePosition.altitude / 30})`
                          }}
                        ></div>
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
                  </div>
                </TabsContent>
                
                <TabsContent value="camera" className="m-0">
                  <div className="relative w-full h-[400px] bg-gray-900 flex items-center justify-center overflow-hidden">
                    {/* Camera View */}
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><rect fill=\"%23205020\" width=\"50\" height=\"50\" /><rect fill=\"%23307030\" x=\"50\" width=\"50\" height=\"50\" /><rect fill=\"%23307030\" y=\"50\" width=\"50\" height=\"50\" /><rect fill=\"%23205020\" x=\"50\" y=\"50\" width=\"50\" height=\"50\" /></svg>')",
                        backgroundSize: `${200 - dronePosition.altitude}px`,
                        filter: `brightness(${0.7 + dronePosition.altitude / 200})`,
                        transform: `rotate(${-dronePosition.rotation}deg) scale(1.2)`,
                        transformOrigin: 'center',
                        transition: 'all 0.5s ease-out',
                      }}
                    ></div>
                    
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
                </TabsContent>
              </Tabs>
            </Card>
            
            {/* Controls Panel */}
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
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <div></div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white/10 border-white/20 hover:bg-white/20" 
                      onClick={() => moveDrone("left")}
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
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <div></div>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white/10 border-white/20 hover:bg-white/20" 
                      onClick={() => moveDrone("down")}
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
                  >
                    <Minimize className="h-4 w-4 mr-1" /> Descend
                  </Button>
                  <Button 
                    className="flex-1 bg-white/10 hover:bg-white/20 border-white/20"
                    variant="outline"
                    onClick={() => changeAltitude(5)}
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
                  >
                    <Camera className="h-4 w-4 mr-1" /> Take Photo
                  </Button>
                  <Button 
                    className="flex-1 bg-white/10 hover:bg-white/20 border-white/20"
                    variant="outline"
                    onClick={toggleDroneRecording}
                  >
                    <Video className="h-4 w-4 mr-1" /> Record
                  </Button>
                </div>
                
                {/* Status */}
                <div className="mt-6 p-2 rounded bg-black/20 text-xs text-white/70">
                  <div>Status: {isDroneOn ? "Active" : "Inactive"}</div>
                  <div>Battery: {isDroneOn ? "94%" : "100%"}</div>
                  <div>Signal: Strong</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Tips */}
          <Card className="mt-4 p-4 bg-black/20 backdrop-blur-sm border-white/10">
            <h3 className="text-sm font-semibold text-white mb-2">Drone Piloting Tips:</h3>
            <ul className="text-xs text-white/70 list-disc pl-4 space-y-1">
              <li>Power on your drone before attempting to fly</li>
              <li>Use touch control on mobile devices for more intuitive control</li>
              <li>Adjust altitude to get different perspectives of your fields</li>
              <li>Switch between map and camera views to monitor your crops</li>
              <li>Start at a lower speed until you're comfortable with the controls</li>
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DroneSimulator;
