
import React from "react";
import { Link } from "react-router-dom";
import { MapIcon } from "lucide-react";

interface FieldCardProps {
  name: string;
  location: string;
  id: string;
}

export const FieldCard: React.FC<FieldCardProps> = ({ name, location, id }) => {
  return (
    <Link
      to={`/field/${id}`}
      className="w-full flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100 shadow-sm group transition-all duration-300 hover:shadow-md"
    >
      <div className="space-y-1">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500">{location}</p>
      </div>
      <div className="h-10 w-10 flex items-center justify-center bg-drone-lightBlue rounded-lg text-drone-blue group-hover:bg-drone-blue group-hover:text-white transition-colors duration-300">
        <MapIcon className="h-5 w-5" />
      </div>
    </Link>
  );
};
