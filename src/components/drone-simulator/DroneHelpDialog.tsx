
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Plant } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DroneHelpDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="bg-white/10 border-white/20 hover:bg-white/20">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-black/80 backdrop-blur-md border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Drone Simulator Help</DialogTitle>
          <DialogDescription className="text-white/70">
            Learn how to control your drone and complete missions
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="controls" className="w-full">
          <TabsList className="bg-black/30 mb-4">
            <TabsTrigger value="controls" className="data-[state=active]:bg-green-500/20">Controls</TabsTrigger>
            <TabsTrigger value="missions" className="data-[state=active]:bg-green-500/20">Missions</TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-green-500/20">Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="controls" className="space-y-3">
            <h3 className="text-sm font-semibold">Movement Controls</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
              <div>⬆️⬇️⬅️➡️ Arrow buttons:</div>
              <div>Move drone in four directions</div>
              <div>Touch & drag:</div>
              <div>Direct drone control on mobile</div>
              <div>Ascend/Descend buttons:</div>
              <div>Change drone altitude</div>
              <div>Speed slider:</div>
              <div>Adjust drone movement speed</div>
            </div>
            
            <h3 className="text-sm font-semibold mt-4">Camera Controls</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
              <div>Take Photo button:</div>
              <div>Capture an image (+10 points in mission areas)</div>
              <div>Record button:</div>
              <div>Start/stop video recording</div>
            </div>
            
            <h3 className="text-sm font-semibold mt-4">Power & Battery</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
              <div>Power button:</div>
              <div>Turn drone on/off</div>
              <div>Charge button:</div>
              <div>Recharge at charging station (bottom right)</div>
            </div>
          </TabsContent>
          
          <TabsContent value="missions" className="space-y-3">
            <h3 className="text-sm font-semibold">Current Missions</h3>
            <ul className="list-disc pl-5 text-sm text-white/80 space-y-2">
              <li>
                <span className="font-medium">Field Inspection:</span> Fly over crop fields and take photos to document their condition
              </li>
              <li>
                <span className="font-medium">Crop Monitoring:</span> Visit all different field types and take photos for analysis
              </li>
              <li>
                <span className="font-medium">Resource Check:</span> Monitor the water reservoir to ensure adequate irrigation levels
              </li>
            </ul>
            
            <h3 className="text-sm font-semibold mt-4">Scoring System</h3>
            <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
              <li>+10 points for each photo taken over a field</li>
              <li>+20 points for completing a full field inspection</li>
              <li>+5 points for each unique field type visited</li>
            </ul>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-3">
            <ul className="list-disc pl-5 text-sm text-white/80 space-y-2">
              <li>Keep your drone battery above 20% to avoid emergency landing</li>
              <li>Use the Map View for navigation and Camera View for detailed inspections</li>
              <li>Plant icons on the map indicate areas of interest that need monitoring</li>
              <li>Higher altitude gives better overview but less detail in photos</li>
              <li>The charging station is located in the bottom right corner</li>
              <li>Take multiple photos of the same area to increase accuracy of analysis</li>
              <li>Use touch controls on mobile devices for more intuitive piloting</li>
            </ul>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
