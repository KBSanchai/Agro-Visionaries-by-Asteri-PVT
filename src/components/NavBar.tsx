
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, Leaf, MessageCircleIcon } from "lucide-react";

export const NavBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 z-10">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <NavItem to="/" icon={<Home className="w-6 h-6" />} isActive={isActive("/")} label="Home" />
        <NavItem to="/navigation" icon={<MapPin className="w-6 h-6" />} isActive={isActive("/navigation")} label="Map" />
        <NavItem to="/health" icon={<Leaf className="w-6 h-6" />} isActive={isActive("/health")} label="Health" />
        <NavItem to="/chatbot" icon={<MessageCircleIcon className="w-6 h-6" />} isActive={isActive("/chatbot")} label="Assistant" />
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
    className={`flex flex-col items-center px-4 py-1 rounded-lg transition-colors ${
      isActive ? "text-drone-blue" : "text-gray-500 hover:text-gray-900"
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </Link>
);
