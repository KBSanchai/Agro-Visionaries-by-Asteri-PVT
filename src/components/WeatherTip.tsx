
import React from "react";
import { Card } from "@/components/ui/card";

interface WeatherTipProps {
  tip: string;
  weatherType: "sunny" | "cloudy" | "rainy" | "stormy" | "cold" | "hot";
  index: number;
}

export const WeatherTip: React.FC<WeatherTipProps> = ({ tip, weatherType, index }) => {
  // Different styling based on weather type
  const getBgColor = () => {
    switch (weatherType) {
      case "sunny":
        return "bg-yellow-50";
      case "cloudy":
        return "bg-gray-50";
      case "rainy":
        return "bg-blue-50";
      case "stormy":
        return "bg-purple-50";
      case "cold":
        return "bg-indigo-50";
      case "hot":
        return "bg-orange-50";
      default:
        return "bg-green-50";
    }
  };

  const getBorderColor = () => {
    switch (weatherType) {
      case "sunny":
        return "border-yellow-200";
      case "cloudy":
        return "border-gray-200";
      case "rainy":
        return "border-blue-200";
      case "stormy":
        return "border-purple-200";
      case "cold":
        return "border-indigo-200";
      case "hot":
        return "border-orange-200";
      default:
        return "border-green-200";
    }
  };

  const getTextColor = () => {
    switch (weatherType) {
      case "sunny":
        return "text-yellow-700";
      case "cloudy":
        return "text-gray-700";
      case "rainy":
        return "text-blue-700";
      case "stormy":
        return "text-purple-700";
      case "cold":
        return "text-indigo-700";
      case "hot":
        return "text-orange-700";
      default:
        return "text-green-700";
    }
  };

  const getEmoji = () => {
    switch (weatherType) {
      case "sunny":
        return ["☀️", "🌱", "🌻"][index % 3];
      case "cloudy":
        return ["⛅", "🌿", "🌾"][index % 3];
      case "rainy":
        return ["🌧️", "💧", "🌊"][index % 3];
      case "stormy":
        return ["⛈️", "🌩️", "⚡"][index % 3];
      case "cold":
        return ["❄️", "🧊", "🧥"][index % 3];
      case "hot":
        return ["🔥", "☀️", "🌡️"][index % 3];
      default:
        return "🌱";
    }
  };

  return (
    <Card className={`${getBgColor()} ${getBorderColor()} border p-4 h-36 flex flex-col animate-fade-in`}>
      <div className="text-3xl mb-2">{getEmoji()}</div>
      <p className={`${getTextColor()} text-sm font-medium flex-1`}>{tip}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs opacity-60">Tip #{index + 1}</span>
        <div className="flex space-x-2">
          <button className="text-xs p-1 hover:bg-white hover:bg-opacity-30 rounded transition-colors">
            👍
          </button>
          <button className="text-xs p-1 hover:bg-white hover:bg-opacity-30 rounded transition-colors">
            🔗
          </button>
        </div>
      </div>
    </Card>
  );
};
