import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
interface DroneBadgeProps {
  id: string;
  name: string;
  isActive?: boolean;
}
export const DroneBadge: React.FC<DroneBadgeProps> = ({
  id,
  name,
  isActive = false
}) => {
  return <Link to={`/drone/${id}`} className="w-full flex items-center bg-white rounded-xl border border-gray-100 p-3 shadow-sm transition-all duration-300 hover:shadow-md group">
      <div className="h-12 w-12 mr-3 overflow-hidden rounded-lg">
        <img alt={name} className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-500" src="/lovable-uploads/846b03cc-af2c-457a-bc97-b88d8cba7772.png" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">Drone</p>
      </div>
      <div className="flex items-center ml-2">
        {isActive && <div className="mr-2 h-2 w-2 bg-green-500 rounded-full animate-pulse-soft" />}
        <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-drone-blue transition-colors duration-300 group-hover:translate-x-1 transform" />
      </div>
    </Link>;
};