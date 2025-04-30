
import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, Thermometer } from "lucide-react";

interface WeatherSpiritProps {
  weatherType: "sunny" | "cloudy" | "rainy" | "stormy" | "cold" | "hot";
  temperature: number;
  timeOfDay: "morning" | "day" | "evening" | "night";
}

export const WeatherSpirit: React.FC<WeatherSpiritProps> = ({ 
  weatherType, 
  temperature,
  timeOfDay
}) => {
  // Determine expressions and animations based on weather
  const getExpression = () => {
    switch (weatherType) {
      case "sunny":
        return "😊"; // happy
      case "cloudy":
        return "😌"; // neutral
      case "rainy":
        return "😔"; // slightly sad
      case "stormy":
        return "😨"; // worried
      case "cold":
        return "🥶"; // cold
      case "hot":
        return "🥵"; // hot
      default:
        return "😊";
    }
  };
  
  const getSpiritColor = () => {
    switch (weatherType) {
      case "sunny":
        return "bg-yellow-300";
      case "cloudy":
        return "bg-blue-200";
      case "rainy":
        return "bg-blue-300";
      case "stormy":
        return "bg-blue-400";
      case "cold":
        return "bg-blue-100";
      case "hot":
        return "bg-orange-300";
      default:
        return "bg-blue-200";
    }
  };
  
  const animations = {
    sunny: "animate-float",
    cloudy: "animate-pulse-soft",
    rainy: "animate-float",
    stormy: "animate-pulse",
    cold: "animate-pulse-soft",
    hot: "animate-pulse",
  };

  // Speech bubble content
  const getSpeechBubble = () => {
    switch (weatherType) {
      case "sunny":
        return "Perfect day for your crops!";
      case "cloudy":
        return "Mild day ahead for farming!";
      case "rainy":
        return "Your plants are getting watered!";
      case "stormy":
        return "Take shelter and stay safe!";
      case "cold":
        return "Brrr! Protect sensitive plants!";
      case "hot":
        return "Keep everything hydrated today!";
      default:
        return "How can I help with farming today?";
    }
  };

  // Get spirit icon
  const getSpiritIcon = () => {
    switch (weatherType) {
      case "sunny":
        return <Sun className="text-yellow-500 h-8 w-8 absolute top-2 right-2 animate-pulse" />;
      case "cloudy":
        return <Cloud className="text-gray-400 h-8 w-8 absolute top-2 right-2 animate-pulse-soft" />;
      case "rainy":
        return <CloudRain className="text-blue-500 h-8 w-8 absolute top-2 right-2 animate-pulse" />;
      case "stormy":
        return <CloudRain className="text-purple-500 h-8 w-8 absolute top-2 right-2 animate-pulse" />;
      case "cold":
        return <CloudSnow className="text-blue-200 h-8 w-8 absolute top-2 right-2 animate-pulse-soft" />;
      case "hot":
        return <Thermometer className="text-red-500 h-8 w-8 absolute top-2 right-2 animate-pulse" />;
      default:
        return null;
    }
  };

  // Get text color based on time of day
  const getTextColor = () => {
    switch (timeOfDay) {
      case "night":
        return "text-white";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Spirit character */}
      <div className={`relative w-32 h-32 rounded-full ${getSpiritColor()} shadow-lg ${animations[weatherType]} mb-3`}>
        {/* Face */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl">{getExpression()}</span>
        </div>
        
        {/* Weather icon */}
        {getSpiritIcon()}
        
        {/* Extra details for weather types */}
        {weatherType === "rainy" && (
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-6 w-1 bg-blue-400 rounded-full animate-bounce" 
                  style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1s" }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Speech bubble */}
      <div className="relative bg-white bg-opacity-80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md max-w-[200px]">
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white bg-opacity-80 rotate-45"></div>
        <p className={`text-center text-sm font-medium ${getTextColor()}`}>
          {getSpeechBubble()}
        </p>
      </div>
    </div>
  );
};
