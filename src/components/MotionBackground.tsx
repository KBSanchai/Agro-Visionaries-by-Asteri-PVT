
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
        return "bg-weather-fluid";
      case "health":
        return "bg-health-fluid";
      case "navigation":
        return "bg-navigation-fluid";
      case "chatbot":
        return "bg-chatbot-fluid";
      case "drone-simulator":
        return "bg-drone-simulator-fluid";
      default:
        return "bg-home-fluid";
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
    
    // Common fluid elements that appear across all pages
    const commonFluidElements = (
      <>
        {/* Flowing pipes */}
        <div className="absolute inset-0 opacity-20">
          <div className="fluid-pipe horizontal" style={{top: '20%', height: '2px'}}></div>
          <div className="fluid-pipe horizontal" style={{top: '40%', height: '2px'}}></div>
          <div className="fluid-pipe horizontal" style={{top: '60%', height: '2px'}}></div>
          <div className="fluid-pipe horizontal" style={{top: '80%', height: '2px'}}></div>
          
          <div className="fluid-pipe vertical" style={{left: '25%', width: '2px'}}></div>
          <div className="fluid-pipe vertical" style={{left: '50%', width: '2px'}}></div>
          <div className="fluid-pipe vertical" style={{left: '75%', width: '2px'}}></div>
        </div>
        
        {/* Fluid bubbles */}
        <div className="fluid-bubbles"></div>
        
        {/* Glowing nodes */}
        <div className="node-glow" style={{top: '20%', left: '25%'}}></div>
        <div className="node-glow" style={{top: '20%', left: '50%'}}></div>
        <div className="node-glow" style={{top: '20%', left: '75%'}}></div>
        
        <div className="node-glow" style={{top: '40%', left: '25%'}}></div>
        <div className="node-glow" style={{top: '40%', left: '75%'}}></div>
        
        <div className="node-glow" style={{top: '60%', left: '25%'}}></div>
        <div className="node-glow" style={{top: '60%', left: '50%'}}></div>
        <div className="node-glow" style={{top: '60%', left: '75%'}}></div>
        
        <div className="node-glow" style={{top: '80%', left: '25%'}}></div>
        <div className="node-glow" style={{top: '80%', left: '50%'}}></div>
        <div className="node-glow" style={{top: '80%', left: '75%'}}></div>
      </>
    );
    
    switch (type) {
      case "weather-spirit":
        return (
          <>
            {commonFluidElements}
            <div className="weather-fluid-clouds" style={style}></div>
            <div className="weather-fluid-rain" 
              style={{...style, transform: `translate(${offsetX * 1.5}px, ${offsetY * 0.5}px)`}}
            ></div>
            <div className="weather-fluid-sun" 
              style={{...style, transform: `translate(${offsetX * -0.2}px, ${offsetY * -0.2}px)`}}
            ></div>
            <div className="farming-fluid-crops" 
              style={{...style, transform: `translate(${offsetX * 0.3}px, ${offsetY * 0.1}px) skewX(${offsetX * 0.2}deg)`}}
            ></div>
          </>
        );
      case "health":
        return (
          <>
            {commonFluidElements}
            <div className="health-fluid-leaves" 
              style={{...style, transform: `translate(${offsetX * 0.8}px, ${offsetY * 0.8}px) rotate(${offsetX * 2}deg)`}}
            ></div>
            <div className="health-fluid-drops" 
              style={{...style, transform: `translate(${offsetX * 1.2}px, ${offsetY * 1.2}px)`}}
            ></div>
            <div className="health-fluid-plants" 
              style={{...style, transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px) scale(${1 + mousePosition.y * 0.1})`}}
            ></div>
          </>
        );
      case "navigation":
        return (
          <>
            {commonFluidElements}
            <div className="nav-fluid-grid" 
              style={{...style, transform: `translate(${offsetX * 0.1}px, ${offsetY * 0.1}px) scale(${1 + mousePosition.y * 0.05})`}}
            ></div>
            <div className="nav-fluid-markers" 
              style={{...style, transform: `translate(${offsetX * 0.8}px, ${offsetY * 0.8}px)`}}
            ></div>
            <div className="nav-fluid-drones" 
              style={{...style, transform: `translate(${offsetX * -0.5}px, ${offsetY * -0.5}px) rotate(${offsetX * 5}deg)`}}
            ></div>
          </>
        );
      case "chatbot":
        return (
          <>
            {commonFluidElements}
            <div className="chat-fluid-bubbles" 
              style={{...style, transform: `translate(${offsetX * 0.6}px, ${offsetY * 0.6}px)`}}
            ></div>
            <div className="chat-fluid-waves" 
              style={{...style, transform: `translate(${offsetX * -0.3}px, ${offsetY * -0.3}px) scale(${1 + mousePosition.x * 0.05})`}}
            ></div>
          </>
        );
      case "drone-simulator":
        return (
          <>
            {commonFluidElements}
            <div className="drone-fluid-grid" 
              style={{...style, transform: `translate(${offsetX * 0.1}px, ${offsetY * 0.1}px)`}}
            ></div>
            <div className="drone-fluid-particles" 
              style={{...style, transform: `translate(${offsetX * 0.7}px, ${offsetY * 0.7}px)`}}
            ></div>
            <div className="drone-fluid-path" 
              style={{...style, transform: `translate(${offsetX * -0.3}px, ${offsetY * -0.3}px) rotate(${offsetX * 1}deg)`}}
            ></div>
            <div className="drone-fluid-fields" 
              style={{...style, transform: `skewX(${offsetX * 0.2}deg) skewY(${offsetY * 0.2}deg)`}}
            ></div>
          </>
        );
      default:
        return (
          <>
            {commonFluidElements}
            <div className="home-fluid-particles" 
              style={{...style, transform: `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px)`}}
            ></div>
            <div className="home-fluid-interactive-element" 
              style={{
                position: "absolute", 
                top: "30%", 
                left: "20%", 
                width: "60%", 
                height: "40%", 
                background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(0,255,255,0.3) 0%, transparent 70%)`,
                transition: "background 0.8s ease-out",
                pointerEvents: "none"
              }}
            ></div>
            <div className="home-fluid-elements" 
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse-soft pointer-events-none"></div>
      )}
    </div>
  );
};
