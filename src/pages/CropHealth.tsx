
import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FarmingTips } from "@/components/FarmingTips";
import { Link } from "react-router-dom";
import { Leaf, AlertTriangle, Activity, ArrowRight, CloudSun } from "lucide-react";

const CropHealth = () => {
  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Crop Health</h1>
              <p className="text-sm text-gray-500">Monitor and improve your crops</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </header>

        {/* Weather Spirit Feature */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-100 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Weather Spirit</h2>
              <p className="text-sm text-gray-600 mt-1">
                Get personalized weather insights and farming tips for your region from your animated weather companion.
              </p>
            </div>
            <div className="bg-white p-2 rounded-full shadow-md">
              <CloudSun className="h-5 w-5 text-blue-500" />
            </div>
          </div>
          <Link to="/weather-spirit">
            <Button className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600">
              Check Weather <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Plant Doctor Feature */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Diagnose Your Crop</h2>
              <p className="text-sm text-gray-600 mt-1">
                Notice something unusual? Our AI Plant Doctor can help identify issues and suggest solutions.
              </p>
            </div>
            <div className="bg-white p-2 rounded-full shadow-md">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
          </div>
          <Link to="/plant-doctor">
            <Button className="w-full flex items-center justify-center gap-2">
              Visit Plant Doctor <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Health Metrics */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center mb-4">
            <Activity className="h-5 w-5 text-drone-blue mr-2" />
            <h2 className="text-lg font-medium">Field Health Metrics</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Soil Moisture</div>
              <div className="text-xl font-semibold text-gray-900">76%</div>
              <div className="text-xs text-green-600">+2% from yesterday</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Leaf Health</div>
              <div className="text-xl font-semibold text-gray-900">92%</div>
              <div className="text-xs text-amber-600">-1% from yesterday</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Pest Risk</div>
              <div className="text-xl font-semibold text-gray-900">Low</div>
              <div className="text-xs text-green-600">Decreased</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Growth Rate</div>
              <div className="text-xl font-semibold text-gray-900">Normal</div>
              <div className="text-xs text-gray-600">On track</div>
            </div>
          </div>
        </div>

        {/* Daily Tips */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <FarmingTips />
        </div>
      </div>
    </Layout>
  );
};

export default CropHealth;
