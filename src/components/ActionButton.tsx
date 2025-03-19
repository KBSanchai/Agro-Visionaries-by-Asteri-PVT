
import React from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "default" | "warning" | "danger";
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  variant = "default",
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center py-3 w-full transition-all duration-300 hover:translate-y-[-2px] focus:outline-none",
        variant === "default" && "text-gray-900",
        variant === "warning" && "text-orange-600",
        variant === "danger" && "text-red-600"
      )}
    >
      <div
        className={cn(
          "h-12 w-12 flex items-center justify-center rounded-xl mb-2",
          variant === "default" && "bg-gray-100",
          variant === "warning" && "bg-orange-100",
          variant === "danger" && "bg-red-100"
        )}
      >
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};
