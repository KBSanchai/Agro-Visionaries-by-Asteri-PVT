
import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { useLocation } from "react-router-dom";
import { MotionBackground } from "./MotionBackground";

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  backgroundType?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideNav = false, 
  backgroundType 
}) => {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const isHomePage = location.pathname === "/";

  // Add a small delay for page transition
  useEffect(() => {
    setMounted(false);
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div 
      className="min-h-screen flex flex-col bg-background overflow-hidden relative"
      onMouseMove={() => !hovering && setHovering(true)}
    >
      <MotionBackground 
        type={backgroundType || location.pathname.substring(1)} 
        isInteractive={hovering}
      />
      
      {/* Fluid pipes throughout the layout */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent fluid-pipe horizontal"></div>
        <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent fluid-pipe horizontal" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-[70%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent fluid-pipe horizontal" style={{animationDelay: '2s'}}></div>
        
        <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent fluid-pipe vertical"></div>
        <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent fluid-pipe vertical" style={{animationDelay: '3s'}}></div>
        
        {/* Glowing connection nodes */}
        <div className="node-glow" style={{top: '10%', left: '20%'}}></div>
        <div className="node-glow" style={{top: '30%', left: '20%'}}></div>
        <div className="node-glow" style={{top: '70%', left: '20%'}}></div>
        <div className="node-glow" style={{top: '10%', left: '80%'}}></div>
        <div className="node-glow" style={{top: '30%', left: '80%'}}></div>
        <div className="node-glow" style={{top: '70%', left: '80%'}}></div>
      </div>
      
      <main 
        className={`flex-1 pb-16 overflow-auto relative z-10 ${
          mounted 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        } transition-all duration-500 ease-out`}
      >
        {/* Subtle top glow effect */}
        <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
        </div>
        
        {children}
      </main>
      {!hideNav && <NavBar />}
    </div>
  );
};
