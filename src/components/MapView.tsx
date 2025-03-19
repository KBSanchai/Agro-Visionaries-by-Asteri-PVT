
import React from "react";

interface MapViewProps {
  height?: string;
  withOverlay?: boolean;
}

export const MapView: React.FC<MapViewProps> = ({ 
  height = "h-56",
  withOverlay = true
}) => {
  return (
    <div className={`w-full ${height} relative overflow-hidden rounded-lg animate-fade-in`}>
      <div className="absolute inset-0 map-container">
        <img 
          src="/lovable-uploads/2d497051-ca73-4eb3-962a-0aec21893859.png" 
          alt="Field map" 
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      {withOverlay && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-16" />
      )}
    </div>
  );
};
