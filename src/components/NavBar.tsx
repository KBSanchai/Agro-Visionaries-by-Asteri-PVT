
import React from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon, ActivityIcon, Settings2Icon, MoreHorizontalIcon } from "lucide-react";

export const NavBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg py-2 px-4 z-50">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <NavItem icon={<HomeIcon className="h-5 w-5" />} to="/" label="Home" />
        <NavItem icon={<ActivityIcon className="h-5 w-5" />} to="/health" label="Health" />
        <NavItem icon={<Settings2Icon className="h-5 w-5" />} to="/settings" label="Settings" />
        <NavItem icon={<MoreHorizontalIcon className="h-5 w-5" />} to="/more" label="More" />
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all duration-200 ${
          isActive
            ? "text-drone-blue"
            : "text-gray-400 hover:text-gray-600"
        }`
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
};
