
import React from "react";
import { Layout } from "@/components/Layout";
import { ActionButton } from "@/components/ActionButton";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, MoreVerticalIcon, PhoneIcon, ShareIcon, HelpCircleIcon, 
         BatteryMediumIcon, CircleAlertIcon, UploadIcon, MapPinIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `${action} action initiated`,
      description: "This feature would connect to the drone system in a real implementation.",
    });
  };

  return (
    <Layout hideNav>
      <div className="max-w-md mx-auto px-4 pb-6">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md flex items-center justify-between py-4">
          <Link 
            to="/drone/1" 
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">Settings</h1>
          <button className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm text-gray-600 hover:text-gray-900 transition-colors">
            <MoreVerticalIcon className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-8">
          <div className="relative w-full py-6 overflow-hidden flex justify-center">
            <img 
              src="/lovable-uploads/f0b2a305-d7e0-4e32-b044-e5937a84b426.png" 
              alt="Agricultural Drone" 
              className="h-48 object-contain animate-float"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">Drone ID: DR 134 SR:1234</h2>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-teal-400"></span>
                14 km
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
                50 km/h
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-400"></span>
                Up To 12.4hz
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
            <ActionButton 
              icon={<PhoneIcon className="h-5 w-5" />} 
              label="Call" 
              onClick={() => handleAction("Call")}
            />
            <ActionButton 
              icon={<ShareIcon className="h-5 w-5" />} 
              label="Share" 
              onClick={() => handleAction("Share")}
            />
            <ActionButton 
              icon={<HelpCircleIcon className="h-5 w-5" />} 
              label="Support" 
              onClick={() => handleAction("Support")}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ActionButton 
              icon={<BatteryMediumIcon className="h-5 w-5" />} 
              label="Battery saver" 
              onClick={() => handleAction("Battery saver")}
            />
            <ActionButton 
              icon={<CircleAlertIcon className="h-5 w-5" />} 
              label="SOS" 
              variant="danger"
              onClick={() => handleAction("SOS")}
            />
            <ActionButton 
              icon={<UploadIcon className="h-5 w-5" />} 
              label="Update" 
              onClick={() => handleAction("Update")}
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <ActionButton 
              icon={<MapPinIcon className="h-5 w-5" />} 
              label="Track" 
              onClick={() => handleAction("Track")}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
