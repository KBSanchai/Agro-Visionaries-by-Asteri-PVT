
import React from "react";
import { Layout } from "@/components/Layout";
import { MapView } from "@/components/MapView";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, MapIcon, FlaskConicalIcon, LeafIcon, SunIcon } from "lucide-react";

const FieldMap = () => {
  return (
    <Layout hideNav>
      <div className="h-screen flex flex-col">
        <header className="sticky top-0 z-10 bg-white flex items-center justify-between p-4">
          <Link 
            to="/" 
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
          <div className="flex-1 mx-4">
            <h1 className="text-lg font-bold">Rice Field</h1>
            <p className="text-xs text-gray-500">5097 Kanchipuram, Tamil Nadu, India</p>
          </div>
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-drone-lightBlue text-drone-blue">
            <MapIcon className="h-5 w-5" />
          </div>
        </header>
        
        <div className="flex-1 relative">
          <MapView height="h-full" withOverlay={false} />
          
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 rounded-t-3xl shadow-lg">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">VT-1</h2>
                <p className="text-sm text-gray-500">DR 134 SR:1234</p>
              </div>
              <div className="flex space-x-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapIcon className="h-4 w-4 mr-1 text-drone-blue" />
                  <span>14 km</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <SunIcon className="h-4 w-4 mr-1 text-drone-blue" />
                  <span>50 km/h</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <FieldDataPoint icon={<SunIcon className="h-5 w-5" />} label="Temperature" value="41°" />
              <FieldDataPoint icon={<LeafIcon className="h-5 w-5" />} label="Humidity" value="68%" />
              <FieldDataPoint icon={<FlaskConicalIcon className="h-5 w-5" />} label="Soil pH" value="6.8" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface FieldDataPointProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const FieldDataPoint: React.FC<FieldDataPointProps> = ({ icon, label, value }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-3">
      <div className="text-drone-blue mb-1">{icon}</div>
      <span className="text-xs text-gray-500 mb-1">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
};

export default FieldMap;
