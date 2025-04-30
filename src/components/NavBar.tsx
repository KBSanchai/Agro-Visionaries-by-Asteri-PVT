
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, Leaf, MessageCircle, CloudSun } from "lucide-react";

export const NavBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-lg border-t border-white/10 py-1 px-3 z-10">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <NavItem 
          to="/" 
          icon={<Home className="w-4 h-4" />} 
          isActive={isActive("/")} 
          label="Home" 
        />
        <NavItem 
          to="/navigation" 
          icon={<MapPin className="w-4 h-4" />} 
          isActive={isActive("/navigation")} 
          label="Map" 
        />
        <NavItem 
          to="/health" 
          icon={<Leaf className="w-4 h-4" />} 
          isActive={isActive("/health")} 
          label="Health" 
        />
        <NavItem 
          to="/weather-spirit" 
          icon={<CloudSun className="w-4 h-4" />} 
          isActive={isActive("/weather-spirit")} 
          label="Weather" 
        />
        <NavItem 
          to="/chatbot" 
          icon={<MessageCircle className="w-4 h-4" />} 
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
    className={`flex flex-col items-center px-1.5 py-1 rounded-lg transition-all duration-300 ${
      isActive 
      ? "bg-gradient-to-r from-blue-500/40 to-purple-500/40 text-white" 
      : "text-gray-300 hover:text-white"
    }`}
  >
    <div className={`rounded-full p-1 ${
      isActive 
        ? "bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 shadow-lg shadow-blue-400/20" 
        : "bg-transparent"
    }`}>
      {icon}
    </div>
    <span className="text-[9px] mt-0.5 font-medium">{label}</span>
  </Link>
);
