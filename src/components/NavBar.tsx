
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, Leaf, MessageCircle, CloudSun, Sunrise } from "lucide-react";

export const NavBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/10 py-2 px-4 z-10">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <NavItem 
          to="/" 
          icon={<Home className="w-5 h-5" />} 
          isActive={isActive("/")} 
          label="Home" 
        />
        <NavItem 
          to="/navigation" 
          icon={<MapPin className="w-5 h-5" />} 
          isActive={isActive("/navigation")} 
          label="Map" 
        />
        <NavItem 
          to="/health" 
          icon={<Leaf className="w-5 h-5" />} 
          isActive={isActive("/health")} 
          label="Health" 
        />
        <NavItem 
          to="/weather-spirit" 
          icon={<CloudSun className="w-5 h-5" />} 
          isActive={isActive("/weather-spirit")} 
          label="Weather" 
        />
        <NavItem 
          to="/chatbot" 
          icon={<MessageCircle className="w-5 h-5" />} 
          isActive={isActive("/chatbot")} 
          label="Assistant" 
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  isActive: boolean;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, isActive, label }) => (
  <Link
    to={to}
    className={`flex flex-col items-center px-2 py-1 rounded-lg transition-all duration-300 ${
      isActive 
      ? "bg-gradient-to-r from-blue-400/30 to-blue-500/30 text-white" 
      : "text-gray-300 hover:text-white"
    }`}
  >
    <div className={`rounded-full p-1.5 ${
      isActive 
        ? "bg-gradient-to-r from-drone-blue to-blue-400 shadow-lg shadow-blue-400/20" 
        : "bg-transparent"
    }`}>
      {icon}
    </div>
    <span className="text-[10px] mt-1 font-medium">{label}</span>
  </Link>
);
