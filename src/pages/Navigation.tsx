
import React from "react";
import { Layout } from "@/components/Layout";
import { MapView } from "@/components/MapView";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, LayersIcon, ZoomInIcon, ZoomOutIcon, NavigationIcon } from "lucide-react";

const Navigation = () => {
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
          <h1 className="text-xl font-bold text-center flex-1">Navigation</h1>
          <div className="h-10 w-10"></div>
        </header>

        <div className="space-y-8">
          <div>
            <MapView height="h-96" withOverlay={false} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Recent Flight Paths</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">South Field Path</h3>
                    <p className="text-sm text-gray-500">Today, 2:30 PM</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">North Field Survey</h3>
                    <p className="text-sm text-gray-500">Yesterday, 11:15 AM</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-6 right-6 flex flex-col gap-3">
            <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-gray-50">
              <ZoomInIcon className="h-5 w-5" />
            </button>
            <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-gray-50">
              <ZoomOutIcon className="h-5 w-5" />
            </button>
            <button className="h-12 w-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-gray-50">
              <LayersIcon className="h-5 w-5" />
            </button>
            <button className="h-12 w-12 flex items-center justify-center rounded-full bg-drone-blue text-white shadow-md hover:bg-drone-blue/90">
              <NavigationIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Navigation;
