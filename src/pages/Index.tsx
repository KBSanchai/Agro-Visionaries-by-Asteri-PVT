
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { DroneBadge } from "@/components/DroneBadge";
import { FieldCard } from "@/components/FieldCard";
import { ControlModes } from "@/components/ControlModes";
import { ChevronRightIcon, Droplet, ThermometerIcon, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Index = () => {
  const [controlMode, setControlMode] = useState<"A" | "M" | "C">("A");

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sanjay</h1>
            <p className="text-sm text-gray-500">Welcome</p>
          </div>
          <Avatar>
            <AvatarImage src="/lovable-uploads/3a1986cd-6e58-41bf-8897-64b18a7f6613.png" alt="Profile" />
            <AvatarFallback className="bg-drone-gray">SJ</AvatarFallback>
          </Avatar>
        </header>

        <DroneBadge id="vt1" name="VT-1" isActive={true} />

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <button className="flex items-center justify-center w-full py-1.5 px-4 bg-drone-blue text-white rounded-lg hover:bg-blue-600 transition-colors">
            <span className="mr-1 font-medium">Start engine</span>
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-medium text-gray-900">All Shots Today</h2>
            <Link to="/analytics" className="text-sm text-drone-blue flex items-center">
              See All
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <div className="flex items-center mb-1">
                <Zap className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">Cover Area</span>
              </div>
              <p className="text-xl font-bold text-gray-900">7km</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100">
              <div className="flex items-center mb-1">
                <Droplet className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">Fertilizer use</span>
              </div>
              <p className="text-xl font-bold text-gray-900">8 Litre</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <ControlModes activeMode={controlMode} onChange={setControlMode} />
        </div>

        <div className="space-y-3">
          <FieldCard 
            id="rice1"
            name="Rice Field" 
            location="5097 Kanchipuram, Tamil Nadu, India" 
          />
          
          <div className="bg-white rounded-xl p-3 border border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              <EnvironmentItem 
                icon={<ThermometerIcon className="h-4 w-4" />}
                label="Temperature"
                value="20°"
              />
              <EnvironmentItem 
                icon={<Zap className="h-4 w-4" />}
                label="Land Efficiency"
                value="76"
              />
              <EnvironmentItem 
                icon={<Droplet className="h-4 w-4" />}
                label="Air Humidity"
                value="32%"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface EnvironmentItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const EnvironmentItem: React.FC<EnvironmentItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center text-gray-500 mb-1">
        {icon}
      </div>
      <span className="text-xs text-gray-500 mb-0.5">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
};

export default Index;
