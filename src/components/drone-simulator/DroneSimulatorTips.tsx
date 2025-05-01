
import React from "react";
import { Card } from "@/components/ui/card";

export const DroneSimulatorTips: React.FC = () => {
  return (
    <Card className="p-4 bg-black/20 backdrop-blur-sm border-white/10">
      <h3 className="text-sm font-semibold text-white mb-2">Drone Piloting Tips:</h3>
      <ul className="text-xs text-white/70 list-disc pl-4 space-y-1">
        <li>Power on your drone before attempting to fly</li>
        <li>Use touch control on mobile devices for more intuitive control</li>
        <li>Adjust altitude to get different perspectives of your fields</li>
        <li>Switch between map and camera views to monitor your crops</li>
        <li>Start at a lower speed until you're comfortable with the controls</li>
        <li>Keep an eye on your battery level - recharge when below 20%</li>
        <li>Visit different field types to learn about various crops</li>
      </ul>
    </Card>
  );
};
