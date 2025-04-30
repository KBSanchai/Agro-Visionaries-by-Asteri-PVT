
import React from "react";

interface MotionBackgroundProps {
  type: string;
}

export const MotionBackground: React.FC<MotionBackgroundProps> = ({ type }) => {
  // Helper function to determine background class based on route
  const getBackgroundClass = () => {
    switch (type) {
      case "weather-spirit":
        return "bg-weather";
      case "health":
        return "bg-health";
      case "navigation":
        return "bg-navigation";
      case "chatbot":
        return "bg-chatbot";
      default:
        return "bg-home";
    }
  };

  // Motion elements based on page type
  const getMotionElements = () => {
    switch (type) {
      case "weather-spirit":
        return (
          <>
            <div className="weather-clouds"></div>
            <div className="weather-rain"></div>
            <div className="weather-sun"></div>
            <div className="farming-crops"></div>
          </>
        );
      case "health":
        return (
          <>
            <div className="health-leaves"></div>
            <div className="health-drops"></div>
          </>
        );
      case "navigation":
        return (
          <>
            <div className="nav-map-grid"></div>
            <div className="nav-markers"></div>
          </>
        );
      case "chatbot":
        return (
          <>
            <div className="chat-bubbles"></div>
          </>
        );
      default:
        return (
          <>
            <div className="home-particles"></div>
          </>
        );
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${getBackgroundClass()}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70 z-0"></div>
      {getMotionElements()}
    </div>
  );
};
