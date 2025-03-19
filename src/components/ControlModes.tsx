
import React from "react";
import { cn } from "@/lib/utils";

type ControlMode = "A" | "M" | "C";

interface ControlModesProps {
  activeMode: ControlMode;
  onChange: (mode: ControlMode) => void;
}

export const ControlModes: React.FC<ControlModesProps> = ({
  activeMode,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-3">
      <p className="text-sm font-medium text-gray-500 mr-1">Drone control</p>
      <div className="flex items-center space-x-3">
        <ModeButton
          mode="A"
          label="Auto"
          isActive={activeMode === "A"}
          onClick={() => onChange("A")}
        />
        <ModeButton
          mode="M"
          label="Manual"
          isActive={activeMode === "M"}
          onClick={() => onChange("M")}
        />
        <ModeButton
          mode="C"
          label="Custom"
          isActive={activeMode === "C"}
          onClick={() => onChange("C")}
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-70"
            >
              <path
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16 10L12 6L8 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6V18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

interface ModeButtonProps {
  mode: ControlMode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

const ModeButton: React.FC<ModeButtonProps> = ({
  mode,
  label,
  isActive,
  onClick,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-12 w-12 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none",
        isActive
          ? "bg-drone-blue text-white shadow-md"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
      aria-label={label}
      title={label}
    >
      {icon ? icon : <span className="text-lg font-medium">{mode}</span>}
    </button>
  );
};
