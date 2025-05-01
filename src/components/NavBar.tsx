
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, Leaf, MessageCircle, CloudSun, Drone } from "lucide-react";

export const NavBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 0 });

  // Track mouse position for gradient effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getGradientPosition = () => {
    return `at ${mousePosition.x}% 50%`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl border-t border-white/10 py-1 px-3 z-10">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-background/80 to-transparent pointer-events-none"></div>
        
        <NavItem 
          to="/" 
          icon={<Home className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/" ? "scale-125" : ""}`} />} 
          isActive={isActive("/")} 
          label="Home" 
          onHover={() => setHoveredItem("/")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
        />
        <NavItem 
          to="/navigation" 
          icon={<MapPin className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/navigation" ? "scale-125" : ""}`} />} 
          isActive={isActive("/navigation")} 
          label="Map" 
          onHover={() => setHoveredItem("/navigation")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
        />
        <NavItem 
          to="/health" 
          icon={<Leaf className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/health" ? "scale-125" : ""}`} />} 
          isActive={isActive("/health")} 
          label="Health" 
          onHover={() => setHoveredItem("/health")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
        />
        <NavItem 
          to="/drone-simulator" 
          icon={<Drone className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/drone-simulator" ? "scale-125" : ""}`} />} 
          isActive={isActive("/drone-simulator")} 
          label="Drone" 
          onHover={() => setHoveredItem("/drone-simulator")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
        />
        <NavItem 
          to="/weather-spirit" 
          icon={<CloudSun className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/weather-spirit" ? "scale-125" : ""}`} />} 
          isActive={isActive("/weather-spirit")} 
          label="Weather"
          onHover={() => setHoveredItem("/weather-spirit")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
        />
        <NavItem 
          to="/chatbot" 
          icon={<MessageCircle className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/chatbot" ? "scale-125" : ""}`} />} 
          isActive={isActive("/chatbot")} 
          label="Assistant" 
          onHover={() => setHoveredItem("/chatbot")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
        />
        
        {hoveredItem && (
          <div 
            className="absolute -top-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse-soft"
            style={{
              transition: "opacity 0.3s ease-out",
              opacity: hoveredItem ? 1 : 0
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  isActive: boolean;
  label: string;
  onHover: () => void;
  onLeave: () => void;
  gradientPosition: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, isActive, label, onHover, onLeave, gradientPosition }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    onHover();
    setIsHovering(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleMouseLeave = () => {
    onLeave();
    setIsHovering(false);
  };

  return (
    <Link
      to={to}
      className={`flex flex-col items-center px-1.5 py-1 rounded-lg transition-all duration-300 ${
        isActive 
        ? `bg-gradient-radial ${gradientPosition} from-blue-500/50 to-purple-500/50 text-white` 
        : "text-gray-400 hover:text-white"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isAnimating ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div className={`rounded-full p-1 transition-all duration-300 ${
        isActive 
          ? "bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 shadow-lg shadow-blue-400/30" 
          : isHovering 
            ? "bg-white/20 shadow-md shadow-white/10"
            : "bg-transparent"
      }`}>
        {icon}
      </div>
      <span className={`text-[9px] mt-0.5 font-medium transition-all ${
        isActive || isHovering ? "text-white" : ""
      }`}>
        {label}
      </span>

      {/* Glow effect for active or hovered items */}
      {(isActive || isHovering) && (
        <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-md"></div>
      )}
    </Link>
  );
};
