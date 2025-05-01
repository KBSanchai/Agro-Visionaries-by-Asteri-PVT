
import React, { useState, useEffect } from "react";

interface MotionBackgroundProps {
  type: string;
  isInteractive?: boolean;
}

export const MotionBackground: React.FC<MotionBackgroundProps> = ({ type, isInteractive = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isInteractive) return;
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isInteractive]);
  
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
      case "drone-simulator":
        return "bg-drone-simulator";
      default:
        return "bg-home";
    }
  };

  // Motion elements based on page type
  const getMotionElements = () => {
    const offsetX = mousePosition.x * 30 - 15; // Creates a -15px to +15px range
    const offsetY = mousePosition.y * 30 - 15; // Creates a -15px to +15px range
    
    const style = isInteractive ? { 
      transform: `translate(${offsetX}px, ${offsetY}px)`, 
      transition: "transform 0.6s ease-out" 
    } : {};
    
    switch (type) {
      case "weather-spirit":
        return (
          <>
            <div className="weather-clouds" style={style}></div>
            <div className="weather-rain" 
              style={{...style, transform: `translate(${offsetX * 1.5}px, ${offsetY * 0.5}px)`}}
            ></div>
            <div className="weather-sun" 
              style={{...style, transform: `translate(${offsetX * -0.2}px, ${offsetY * -0.2}px)`}}
            ></div>
            <div className="farming-crops" 
              style={{...style, transform: `translate(${offsetX * 0.3}px, ${offsetY * 0.1}px) skewX(${offsetX * 0.2}deg)`}}
            ></div>
          </>
        );
      case "health":
        return (
          <>
            <div className="health-leaves" 
              style={{...style, transform: `translate(${offsetX * 0.8}px, ${offsetY * 0.8}px) rotate(${offsetX * 2}deg)`}}
            ></div>
            <div className="health-drops" 
              style={{...style, transform: `translate(${offsetX * 1.2}px, ${offsetY * 1.2}px)`}}
            ></div>
            <div className="health-plants" 
              style={{...style, transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px) scale(${1 + mousePosition.y * 0.1})`}}
            ></div>
          </>
        );
      case "navigation":
        return (
          <>
            <div className="nav-map-grid" 
              style={{...style, transform: `translate(${offsetX * 0.1}px, ${offsetY * 0.1}px) scale(${1 + mousePosition.y * 0.05})`}}
            ></div>
            <div className="nav-markers" 
              style={{...style, transform: `translate(${offsetX * 0.8}px, ${offsetY * 0.8}px)`}}
            ></div>
            <div className="nav-drones" 
              style={{...style, transform: `translate(${offsetX * -0.5}px, ${offsetY * -0.5}px) rotate(${offsetX * 5}deg)`}}
            ></div>
          </>
        );
      case "chatbot":
        return (
          <>
            <div className="chat-bubbles" 
              style={{...style, transform: `translate(${offsetX * 0.6}px, ${offsetY * 0.6}px)`}}
            ></div>
            <div className="chat-waves" 
              style={{...style, transform: `translate(${offsetX * -0.3}px, ${offsetY * -0.3}px) scale(${1 + mousePosition.x * 0.05})`}}
            ></div>
          </>
        );
      case "drone-simulator":
        return (
          <>
            <div className="drone-grid" 
              style={{...style, transform: `translate(${offsetX * 0.1}px, ${offsetY * 0.1}px)`}}
            ></div>
            <div className="drone-particles" 
              style={{...style, transform: `translate(${offsetX * 0.7}px, ${offsetY * 0.7}px)`}}
            ></div>
            <div className="drone-path" 
              style={{...style, transform: `translate(${offsetX * -0.3}px, ${offsetY * -0.3}px) rotate(${offsetX * 1}deg)`}}
            ></div>
            <div className="drone-fields" 
              style={{...style, transform: `skewX(${offsetX * 0.2}deg) skewY(${offsetY * 0.2}deg)`}}
            ></div>
          </>
        );
      default:
        return (
          <>
            <div className="home-particles" 
              style={{...style, transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)`}}
            ></div>
            <div className="home-interactive-element" 
              style={{
                position: "absolute", 
                top: "30%", 
                left: "20%", 
                width: "60%", 
                height: "40%", 
                background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                transition: "background 0.8s ease-out",
                pointerEvents: "none"
              }}
            ></div>
            <div className="home-farming-elements" 
              style={{...style, transform: `translate(${offsetX * 0.2}px, ${offsetY * 0.2}px) rotate(${offsetX}deg)`}}
            ></div>
          </>
        );
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${getBackgroundClass()}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70 z-0"></div>
      {getMotionElements()}
      {isInteractive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-soft pointer-events-none"></div>
      )}
    </div>
  );
};
