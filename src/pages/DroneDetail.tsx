import React from "react";
import { Layout } from "@/components/Layout";
import { DroneStatus } from "@/components/DroneStatus";
import { MapView } from "@/components/MapView";
import { ActionButton } from "@/components/ActionButton";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, MoreVerticalIcon, PhoneIcon, ShareIcon, HelpCircleIcon, BatteryMediumIcon, Clock, UploadIcon, Settings } from "lucide-react";
const DroneDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  return <Layout hideNav>
      <div className="max-w-md mx-auto px-4 pb-6">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md flex items-center justify-between py-4">
          <Link to="/" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm text-gray-600 hover:text-gray-900 transition-colors">
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">VT-1</h1>
          <Link to="/settings" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm text-gray-600 hover:text-gray-900 transition-colors">
            <Settings className="h-5 w-5" />
          </Link>
        </header>

        <div className="space-y-8">
          <div className="relative w-full py-6 overflow-hidden flex justify-center">
            <img alt="VT-1 Drone" className="h-40 object-contain animate-float" src="/lovable-uploads/a18a91bc-ba39-4dcc-9c7c-65c1d789a374.png" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium">7KM <span className="text-sm text-gray-500">Range</span></h2>
            <DroneStatus battery={85} speed={59.9} range="7KM" wind="10km/h" idleTime="2:30:21" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Navigation</h2>
              <Link to="/navigation" className="text-sm text-drone-blue">See All</Link>
            </div>
            <MapView />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
            <ActionButton icon={<PhoneIcon className="h-5 w-5" />} label="Call" />
            <ActionButton icon={<ShareIcon className="h-5 w-5" />} label="Share" />
            <ActionButton icon={<HelpCircleIcon className="h-5 w-5" />} label="Support" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <ActionButton icon={<BatteryMediumIcon className="h-5 w-5" />} label="Battery saver" />
            <ActionButton icon={<Clock className="h-5 w-5" />} label="SOS" variant="danger" />
            <ActionButton icon={<UploadIcon className="h-5 w-5" />} label="Update" />
          </div>
        </div>
      </div>
    </Layout>;
};
export default DroneDetail;