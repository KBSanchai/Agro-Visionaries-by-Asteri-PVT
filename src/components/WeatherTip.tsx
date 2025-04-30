
import React from "react";
import { Card } from "@/components/ui/card";

interface WeatherTipProps {
  tip: string;
  weatherType: "sunny" | "cloudy" | "rainy" | "stormy" | "cold" | "hot";
  index: number;
}

export const WeatherTip: React.FC<WeatherTipProps> = ({ tip, weatherType, index }) => {
  // Different styling based on weather type
  const getBgGradient = () => {
    switch (weatherType) {
      case "sunny":
        return "bg-gradient-to-br from-yellow-400/30 to-yellow-200/30";
      case "cloudy":
        return "bg-gradient-to-br from-gray-400/30 to-gray-300/30";
      case "rainy":
        return "bg-gradient-to-br from-blue-400/30 to-blue-300/30";
      case "stormy":
        return "bg-gradient-to-br from-purple-500/30 to-purple-400/30";
      case "cold":
        return "bg-gradient-to-br from-indigo-400/30 to-indigo-300/30";
      case "hot":
        return "bg-gradient-to-br from-orange-500/30 to-orange-400/30";
      default:
        return "bg-gradient-to-br from-green-400/30 to-green-300/30";
    }
  };

  const getBorderColor = () => {
    switch (weatherType) {
      case "sunny":
        return "border-yellow-200/50";
      case "cloudy":
        return "border-gray-200/50";
      case "rainy":
        return "border-blue-200/50";
      case "stormy":
        return "border-purple-200/50";
      case "cold":
        return "border-indigo-200/50";
      case "hot":
        return "border-orange-200/50";
      default:
        return "border-green-200/50";
    }
  };

  const getTextColor = () => {
    switch (weatherType) {
      case "sunny":
        return "text-yellow-700 dark:text-yellow-200";
      case "cloudy":
        return "text-gray-700 dark:text-gray-200";
      case "rainy":
        return "text-blue-700 dark:text-blue-200";
      case "stormy":
        return "text-purple-700 dark:text-purple-200";
      case "cold":
        return "text-indigo-700 dark:text-indigo-200";
      case "hot":
        return "text-orange-700 dark:text-orange-200";
      default:
        return "text-green-700 dark:text-green-200";
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
    <Card className={`${getBgGradient()} ${getBorderColor()} border backdrop-blur-sm p-4 h-36 flex flex-col animate-fade-in transition-all duration-300 hover:shadow-lg hover:shadow-white/10 hover:translate-y-[-2px]`}>
      <div className="text-3xl mb-2 animate-soft-float">{getEmoji()}</div>
      <p className={`${getTextColor()} text-sm font-medium flex-1`}>{tip}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs opacity-60">Tip #{index + 1}</span>
        <div className="flex space-x-2">
          <button className="text-xs p-1.5 hover:bg-white hover:bg-opacity-30 rounded transition-colors">
            👍
          </button>
          <button className="text-xs p-1.5 hover:bg-white hover:bg-opacity-30 rounded transition-colors">
            🔗
          </button>
        </div>
      </div>
    </Card>
  );
};
