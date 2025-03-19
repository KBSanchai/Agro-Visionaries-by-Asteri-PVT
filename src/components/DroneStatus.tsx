
import React from "react";
import { Battery, GaugeIcon, MapPinIcon, Wind, Clock } from "lucide-react";

interface DroneStatusProps {
  battery: number;
  speed: number;
  range: string;
  wind: string;
  idleTime: string;
}

export const DroneStatus: React.FC<DroneStatusProps> = ({
  battery,
  speed,
  range,
  wind,
  idleTime,
}) => {
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="w-full">
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-drone-blue transition-all duration-1000 ease-in-out"
            style={{ width: `${battery}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Battery</span>
          <span className="font-medium">{battery}%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatusItem
          icon={<GaugeIcon className="h-5 w-5 text-drone-blue" />}
          label="Speed"
          value={`${speed}`}
          unit="km/h"
        />
        <StatusItem
          icon={<MapPinIcon className="h-5 w-5 text-drone-blue" />}
          label="Range"
          value={range}
          unit=""
        />
        <StatusItem
          icon={<Wind className="h-5 w-5 text-drone-blue" />}
          label="Wind"
          value={wind}
          unit=""
        />
      </div>

      <div className="flex items-center justify-between bg-drone-gray/40 rounded-xl p-3">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-sm font-medium">Idle Time</span>
        </div>
        <span className="text-sm font-bold">{idleTime} hrs</span>
      </div>
    </div>
  );
};

interface StatusItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ icon, label, value, unit }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-drone-gray/40 rounded-xl p-3 transition-transform duration-300 hover:translate-y-[-2px]">
      <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full mb-2 shadow-sm">
        {icon}
      </div>
      <span className="text-xs text-gray-500">{label}</span>
      <div className="flex items-baseline">
        <span className="font-bold">{value}</span>
        <span className="text-xs text-gray-500 ml-1">{unit}</span>
      </div>
    </div>
  );
};
