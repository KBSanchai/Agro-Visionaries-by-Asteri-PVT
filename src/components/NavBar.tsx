
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, Leaf, MessageCircle, CloudSun, Laptop } from "lucide-react";

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
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-xl border-t border-white/20 py-2 px-3 z-10 shadow-lg shadow-blue-500/20">
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-blue-900/80 to-transparent pointer-events-none"></div>
        
        <NavItem 
          to="/" 
          icon={<Home className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/" ? "scale-125" : ""}`} />} 
          isActive={isActive("/")} 
          label="Home" 
          onHover={() => setHoveredItem("/")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
          color="blue"
        />
        <NavItem 
          to="/navigation" 
          icon={<MapPin className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/navigation" ? "scale-125" : ""}`} />} 
          isActive={isActive("/navigation")} 
          label="Map" 
          onHover={() => setHoveredItem("/navigation")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
          color="green"
        />
        <NavItem 
          to="/health" 
          icon={<Leaf className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/health" ? "scale-125" : ""}`} />} 
          isActive={isActive("/health")} 
          label="Health" 
          onHover={() => setHoveredItem("/health")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
          color="emerald"
        />
        <NavItem 
          to="/drone-simulator" 
          icon={<Laptop className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/drone-simulator" ? "scale-125" : ""}`} />} 
          isActive={isActive("/drone-simulator")} 
          label="Drone" 
          onHover={() => setHoveredItem("/drone-simulator")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
          color="cyan"
        />
        <NavItem 
          to="/weather-spirit" 
          icon={<CloudSun className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/weather-spirit" ? "scale-125" : ""}`} />} 
          isActive={isActive("/weather-spirit")} 
          label="Weather"
          onHover={() => setHoveredItem("/weather-spirit")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
          color="sky"
        />
        <NavItem 
          to="/chatbot" 
          icon={<MessageCircle className={`w-4 h-4 transition-all duration-300 ${hoveredItem === "/chatbot" ? "scale-125" : ""}`} />} 
          isActive={isActive("/chatbot")} 
          label="Assistant" 
          onHover={() => setHoveredItem("/chatbot")}
          onLeave={() => setHoveredItem(null)}
          gradientPosition={getGradientPosition()}
          color="purple"
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
  color: "blue" | "green" | "emerald" | "cyan" | "sky" | "purple";
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  isActive, 
  label, 
  onHover, 
  onLeave, 
  gradientPosition,
  color 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const colorMap = {
    blue: {
      active: "from-blue-400 via-blue-500 to-blue-600",
      hover: "bg-blue-500/20",
      glow: "shadow-blue-400/30"
    },
    green: {
      active: "from-green-400 via-green-500 to-green-600",
      hover: "bg-green-500/20",
      glow: "shadow-green-400/30"
    },
    emerald: {
      active: "from-emerald-400 via-emerald-500 to-emerald-600",
      hover: "bg-emerald-500/20",
      glow: "shadow-emerald-400/30"
    },
    cyan: {
      active: "from-cyan-400 via-cyan-500 to-cyan-600",
      hover: "bg-cyan-500/20",
      glow: "shadow-cyan-400/30"
    },
    sky: {
      active: "from-sky-400 via-sky-500 to-sky-600",
      hover: "bg-sky-500/20",
      glow: "shadow-sky-400/30"
    },
    purple: {
      active: "from-purple-400 via-purple-500 to-purple-600",
      hover: "bg-purple-500/20",
      glow: "shadow-purple-400/30"
    }
  };

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
        ? `bg-gradient-radial ${gradientPosition} from-${color}-500/50 to-${color}-700/30 text-white` 
        : "text-gray-300 hover:text-white"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isAnimating ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div className={`rounded-full p-1.5 transition-all duration-300 ${
        isActive 
          ? `bg-gradient-to-r ${colorMap[color].active} shadow-lg ${colorMap[color].glow}` 
          : isHovering 
            ? `${colorMap[color].hover} shadow-md shadow-white/10`
            : "bg-transparent"
      }`}>
        {icon}
      </div>
      <span className={`text-[10px] mt-0.5 font-medium transition-all ${
        isActive || isHovering ? "text-white" : ""
      }`}>
        {label}
      </span>

      {/* Glow effect for active or hovered items */}
      {(isActive || isHovering) && (
        <div className={`absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-${color}-500/20 to-${color}-700/20 blur-md`}></div>
      )}
    </Link>
  );
};
